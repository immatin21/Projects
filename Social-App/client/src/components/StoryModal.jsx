import React from "react";
import { ArrowLeft, Sparkle, TextIcon, Upload, UploadIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";

const StoryModal = ({ setShowModal, fetchStories }) => {
  const bgColors = [
    "#4f46e5",
    "#7c3aed",
    "#db2777",
    "#e11d48",
    "#ca8a04",
    "#0d9488",
  ];

  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const {getToken} = useAuth()

  const MAX_VIDEO_DURATION = 60 // seconds
  const MAX_VIDEO_FILE_SIZE = 50 // MB

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if(file.type.startsWith('video')){
        if (file.size > MAX_VIDEO_FILE_SIZE * 1024 * 1024){
          toast.error(`Video file size cannot exceed ${MAX_VIDEO_FILE_SIZE} MB.`)
          setMedia(null)
          setPreviewURL(null)
          return
        }
        const video = document.createElement('video')
        video.preload = "metadata"
        video.onloadedmetadata = ()=>{
          window.URL.revokeObjectURL(video)
          if(video.duration > MAX_VIDEO_DURATION){
            toast.error(`Video duration cannot exceed ${MAX_VIDEO_DURATION} seconds.`)
            setMedia(null)
            setPreviewURL(null)
          }
          else {
              setMedia(file)
              setPreviewURL(URL.createObjectURL(file))
              setText('')
              setMode('media')
            }
          }
          video.src = URL.createObjectURL(file)    
        }else if(file.type.startsWith('image')){
          setMedia(file)
          setPreviewURL(URL.createObjectURL(file))
          setText('')
          setMode('media')
      }
    }
  };

  const handleCreateStory = async () => {

    const media_type = mode === 'media' ? media?.type.startsWith('image') ? 'image' : 'video'  : 'text'

    if(media_type === text && !text){
      throw new Error("Please enter some text!")
    }

    let formData = new FormData()
      formData.append('content',text)
      formData.append('media_type',media_type)
      formData.append('media',media)
      formData.append('background_colour', background)
    
    const token = await getToken()
    
    try {
      const {data} = await api.post('/api/story/add', formData , {
        headers : {Authorization : `Bearer ${token}`}
      })
  
      if(data.success){
        setShowModal(false)
        toast.success("Story Created Successfully")
        fetchStories()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)

    }


  };
  
  return (
    <div className="fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowModal(false)}
            className="text-white p-2 cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <span className="w-10"></span>
        </div>

        <div
          className="rounded-lg relative flex items-center justify-center h-96"
          style={{ backgroundColor: background }}
        >
          {mode === "text" && (
            <textarea
              className="bg-transparent text-white w-full h-full resize-none focus:outline-none p-6 text-lg"
              placeholder="What's on your mind?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          )}
          {mode === "media" &&
            previewURL &&
            (media?.type.startsWith("image") ? (
              <img
                src={previewURL}
                alt="Preview"
                className="max-h-full object-contain"
              />
            ) : (
              <video
                src={previewURL}
                controls
                className="max-h-full object-contain"
              />
            ))}
        </div>

        <div className="flex gap-2 mt-4">
          {bgColors.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded-full ring cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => {
                setBackground(color);
              }}
            />
          ))}
        </div>

        <div className="flex mt-4 gap-2">
          <button
            onClick={() => {
              setMode("text");
              setPreviewURL(null);
              setMedia(null);
            }}
            className={`flex-1 flex items-center justify-center p-2 gap-2 rounded cursor-pointer
              ${mode === "text" ? "bg-white text-black" : "bg-zinc-800"}`}
          >
            <TextIcon size={18} /> Text
          </button>
          <label
            className={`flex-1 flex items-center justify-center p-2 gap-2 rounded cursor-pointer ${
              mode === "media" ? "bg-white text-black" : "bg-zinc-800"
            }`}
          >
            <input
              onChange={handleMediaUpload}
              type="file"
              accept="image/*,video/*"
              className="hidden"
            />
            <Upload size={18} /> Photo/Video
          </label>
        </div>
        {/* Create Story Button */}
        <button
          onClick={() => toast.promise(handleCreateStory(), {
            loading : 'Creating Story...'
          })}
          className="flex items-center justify-center gap-2 py-3 mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded hover:from-indigo-700 hover:to-purple-700 transition cursor-pointer active:scale-95"
        >
          <Sparkle size={18} /> Create Story
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
