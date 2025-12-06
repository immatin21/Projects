import { Inngest, step } from "inngest";
import User from "../models/User.js";
import Connection from "../models/Connection.js";
import sendEmail from "../configs/nodeMailer.js";
import Story from "../models/Story.js";
import Message from "../models/Message.js";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "pingup-app" });

// Inngest function to save user data to the database

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    let username = email_addresses[0]?.email_address.split("@")[0];

    // Check if username already exists in the database
    const user = await User.findOne({ username });
    if (user) {
      username = username + Math.floor(Math.random() * 10000); // Making username unique
    }
    // Create a new user in the database

    const userData = {
      _id: id,
      email: email_addresses[0]?.email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username,
    };

    let person = await User.create(userData);
    console.log("User created in DB from Clerk", person);
  }
);

// Inngest function to update user data in the database

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const updatedUserData = {
      email: email_addresses[0]?.email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
    };

    await User.findByIdAndUpdate(id, updatedUserData);
  }
);

// Inngest function to delete user data from the database

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await User.findByIdAndDelete(id);
  }
);

// Create inngest functions to send connection request emails

const sendConnectionRequestReminder = inngest.createFunction(
  { id: "send-new-connection-request-reminder" },
  { event: "app/connection-request" },

  async ({ event, step }) => {
    const { connectionId } = event.data;

    await step.run("send-connection-request-email", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "to_user_id from_user_id"
      );

      const subject = `👋 New Connection Request`;
      const html_for_request = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>New Connection Request</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f7;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #111827;
          }
          .wrapper { padding: 24px 0; }
          .container {
            max-width: 520px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 18px 35px rgba(15, 23, 42, 0.08);
            border: 1px solid #e5e7eb;
          }
          .logo {
            text-align: center;
            margin-bottom: 16px;
            font-size: 24px;
            font-weight: 700;
            color: #4f46e5;
          }
          .logo span { color: #111827; font-weight: 600; }
          .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 11px;
            background-color: #eef2ff;
            color: #4f46e5;
            margin-bottom: 12px;
          }
          h1 { font-size: 20px; margin: 0 0 12px; }
          p { margin: 8px 0; line-height: 1.6; font-size: 14px; color: #4b5563; }
          .highlight-box {
            margin: 20px 0; padding: 16px 14px; border-radius: 14px;
            background: #f9fafb; border: 1px solid #e5e7eb;
          }
          .user-chip {
            display: flex; align-items: center; gap: 10px; margin-top: 6px;
            font-size: 14px; color: #111827;
          }
          .avatar {
            width: 32px; height: 32px; border-radius: 999px;
            background: linear-gradient(135deg, #4f46e5, #6366f1);
            display: inline-flex; align-items: center; justify-content: center;
            font-size: 14px; font-weight: 600; color: #ffffff;
          }
          .button-wrapper { text-align: center; margin: 22px 0 16px; }
          .btn-primary {
            display: inline-block; padding: 10px 26px; border-radius: 999px;
            background: linear-gradient(135deg, #4f46e5, #6366f1);
            color: #ffffff !important; text-decoration: none;
            font-size: 14px; font-weight: 600; text-transform: uppercase;
          }
          .meta { font-size: 12px; color: #9ca3af; margin-top: 4px; }
          .footer { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="logo">Ping<span>Up</span></div>
            <div style="text-align:center;">
              <div class="badge">New connection request</div>
            </div>

            <h1>Hi ${connection.to_user_id.full_name},</h1>
            <p>You have a new connection request waiting for you on <strong>PingUp</strong>.</p>

            <div class="highlight-box">
              <p style="margin-top:0;">Request received from:</p>
              <div class="user-chip">
                <div class="avatar">
                     ${
                       connection.from_user_id.profile_picture
                         ? `<img src="${connection.from_user_id.profile_picture}" alt="${connection.from_user_id.full_name}" style="width:32px; height:32px; border-radius:999px; object-fit:cover;" />`
                         : connection.from_user_id.full_name
                             .split(" ")
                             .map((word) => word[0])
                             .join("")
                             .toUpperCase()
                     }
                </div>

                <div>
                  <div style="font-weight:600;">${
                    connection.from_user_id.full_name
                  }</div>
                  <div style="font-size:12px; color:#6b7280;">wants to connect with you</div>
                </div>
              </div>
            </div>

            <div class="button-wrapper">
              <a href="${process.env.FRONTEND_URL}/connections"
                class="btn-primary">View request</a>
              <div class="meta">This button takes you directly to the request.</div>
            </div>

            <p>If this wasn’t you, simply ignore this email.</p>

            <p>
              Best regards,<br/>
              <strong>PingUp - Stay Connected</strong>
            </p>

            <div class="footer">
              Need help? <a href="mailto:support@pingup.app">Contact support</a>.
            </div>
          </div>
        </div>
      </body>
      </html>
      `;
      const body = html_for_request;

      await sendEmail({
        to: connection.to_user_id.email,
        subject,
        body,
      });
    });

    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);
    await step.run("send-connection-request-reminder", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id"
      );

      if (connection.status === "accepted") {
        return { message: "Connection request already accepted" };
      }
      const subject = `⏰ Reminder: Pending Connection Request`;

      const html_for_reminder = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Pending Connection Request Reminder</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body {
    margin: 0; padding: 0;
    background-color: #f4f4f7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #111827;
  }
  .wrapper { padding: 24px 0; }
  .container {
    max-width: 520px; margin: 0 auto; background: #ffffff;
    border-radius: 16px; padding: 24px;
    box-shadow: 0 18px 35px rgba(15,23,42,0.08);
    border: 1px solid #e5e7eb;
  }
  .logo {
    text-align: center; margin-bottom: 16px;
    font-size: 24px; font-weight: 700; color: #4f46e5;
  }
  .logo span { color: #111827; font-weight: 600; }
  .badge {
    display: inline-block; padding: 6px 12px;
    background-color: #fef3c7; color: #b45309;
    border-radius: 999px; font-size: 11px; font-weight: 600;
    margin-bottom: 14px; text-transform: uppercase;
  }
  h1 { font-size: 20px; margin: 0 0 12px; }
  p { margin: 8px 0; line-height: 1.6; font-size: 14px; color: #4b5563; }
  .highlight-box {
    margin: 20px 0; padding: 16px; border-radius: 14px;
    background: #f9fafb; border: 1px solid #e5e7eb;
  }
  .user-chip {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; color: #111827;
  }
  .avatar {
    width: 40px; height: 40px; border-radius: 999px;
    background: linear-gradient(135deg,#4f46e5,#6366f1);
    display: flex; align-items: center; justify-content: center;
    color: #ffffff; font-size: 14px; font-weight: 600; overflow:hidden;
  }
  .button-wrapper { text-align: center; margin: 24px 0 16px; }
  .btn-primary {
    display: inline-block; padding: 10px 26px; border-radius: 999px;
    background: linear-gradient(135deg,#4f46e5,#6366f1); color:#ffffff !important;
    font-size: 14px; font-weight: 600; text-decoration: none; text-transform: uppercase;
  }
  .meta { font-size: 12px; color: #9ca3af; margin-top: 4px; }
  .footer {
    text-align: center; font-size: 11px; color:#9ca3af; margin-top:16px;
  }
</style>
</head>
<body>
<div class="wrapper">
  <div class="container">
    <div class="logo">Ping<span>Up</span></div>
    <div style="text-align:center;">
      <div class="badge">Reminder</div>
    </div>

    <h1>Hi ${connection.to_user_id.full_name},</h1>

    <p>You still have a <strong>pending connection request</strong> waiting on PingUp.</p>

    <div class="highlight-box">
      <p style="margin-top:0;">Request from:</p>
      <div class="user-chip">
        <div class="avatar">
        ${
          connection.from_user_id.profile_picture
            ? `<img src="${connection.from_user_id.profile_picture}" style="width:40px;height:40px;object-fit:cover;" />`
            : connection.from_user_id.full_name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
        }
        </div>
        <div>
          <div style="font-weight:600;">${
            connection.from_user_id.full_name
          }</div>
          <div style="font-size:12px; color:#6b7280;">
            is waiting for your response
          </div>
        </div>
      </div>
    </div>

    <p>Take a moment to accept or decline this request and keep your network active.</p>

    <div class="button-wrapper">
      <a href="${process.env.FRONTEND_URL}/connections" class="btn-primary">
        Review request
      </a>
      <div class="meta">Click to manage your pending requests.</div>
    </div>

    <p>If you didn’t create a PingUp account, ignore this email.</p>

    <p style="margin-top:18px;">
      Best regards,<br />
      <strong>PingUp - Stay Connected</strong>
    </p>

    <div class="footer">
      Need help? <a href="mailto:support@pingup.app">Contact support</a>.
    </div>
  </div>
</div>
</body>
</html>
`;
      const body = html_for_reminder;

      await sendEmail({
        to: connection.to_user_id.email,
        subject,
        body,
      });
    });

    return { message: "Connection request reminder sent." };
  }
);

// Inngest function to delete story after 24 hours of creation

const deleteStory = inngest.createFunction(
  { id: "story-delete" },
  { event: "app/story.delete" },

  async ({ event, step }) => {
    const { storyId } = event.data;
    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);
    await step.run("delete-story", async () => {
      await Story.findByIdAndDelete(storyId);
      return { message: "Story deleted." };
    });
  }
);

// Send Notification of unseen messages

const sendUnseenMessagesNotification = inngest.createFunction(
  { id: "send-unseen-messages-notification" },
  { cron: "TZ=America/New_York 0 8 * * *" }, // Every day at 8 AM
  async ({ step }) => {
    const messages = await Message.find({ seen: false }).populate("to_user_id");
    let unseenCount = {};

    messages.map((msg) => {
      unseenCount[msg.to_user_id._id] =
        (unseenCount[msg.to_user_id._id] || 0) + 1;
    });

    for (const userId in unseenCount) {
      const user = await User.findById(userId);

      const subject = `📬 You have ${unseenCount[userId]} unseen messages`;

      const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <title>You have unread messages</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f7;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  color: #111827;
                }
                .wrapper { padding: 24px 0; }
                .container {
                  max-width: 520px;
                  margin: 0 auto;
                  background: #ffffff;
                  border-radius: 16px;
                  padding: 24px;
                  box-shadow: 0 18px 35px rgba(15,23,42,0.08);
                  border: 1px solid #e5e7eb;
                }
                .logo {
                  text-align: center;
                  margin-bottom: 16px;
                  font-size: 24px;
                  font-weight: 700;
                  color: #4f46e5;
                }
                .logo span { color: #111827; font-weight: 600; }
                .badge {
                  display: inline-block;
                  padding: 4px 10px;
                  border-radius: 999px;
                  font-size: 11px;
                  background-color: #eef2ff;
                  color: #4f46e5;
                  margin-bottom: 12px;
                  text-transform: uppercase;
                  letter-spacing: 0.08em;
                  font-weight: 600;
                }
                h1 { font-size: 20px; margin: 0 0 12px; }
                p { margin: 8px 0; line-height: 1.6; font-size: 14px; color: #4b5563; }
                .messages-box {
                  margin: 18px 0;
                  padding: 14px 14px 8px;
                  border-radius: 14px;
                  background: #f9fafb;
                  border: 1px solid #e5e7eb;
                }
                .message-item {
                  padding: 8px 0;
                  border-bottom: 1px solid #e5e7eb;
                  font-size: 13px;
                }
                .message-item:last-child {
                  border-bottom: none;
                }
                .sender {
                  font-weight: 600;
                  font-size: 13px;
                  color: #111827;
                }
                .preview {
                  font-size: 12px;
                  color: #6b7280;
                  margin-top: 2px;
                }
                .button-wrapper { text-align: center; margin: 22px 0 16px; }
                .btn-primary {
                  display: inline-block;
                  padding: 10px 26px;
                  border-radius: 999px;
                  background: linear-gradient(135deg, #4f46e5, #6366f1);
                  color: #ffffff !important;
                  text-decoration: none;
                  font-size: 14px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.04em;
                }
                .meta { font-size: 12px; color: #9ca3af; margin-top: 4px; text-align:center; }
                .footer {
                  text-align: center;
                  font-size: 11px;
                  color:#9ca3af;
                  margin-top: 16px;
                }
                .footer a {
                  color:#6b7280;
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div class="container">
                  <div class="logo">Ping<span>Up</span></div>

                  <div style="text-align:center;">
                    <div class="badge">New messages</div>
                  </div>

                  <h1>Hi ${user.full_name},</h1>

                  <p>
                    You have <strong>${unreadCount} unread message${
                    unreadCount === 1 ? "" : "s"
                  }</strong> waiting for you on PingUp.
                  </p>

                  ${
                    unreadMessages && unreadMessages.length
                      ? `
                  <div class="messages-box">
                    ${unreadMessages
                      .slice(0, 3)
                      .map(
                        (msg) => `
                      <div class="message-item">
                        <div class="sender">
                          ${msg.from_user_id?.full_name || "Someone"} ${
                          msg.from_user_id?.username
                            ? `(@${msg.from_user_id.username})`
                            : ""
                        }
                        </div>
                        <div class="preview">
                          ${
                            msg.text
                              ? msg.text.length > 80
                                ? msg.text.slice(0, 77) + "..."
                                : msg.text
                              : msg.image
                              ? "📷 Image message"
                              : "New message"
                          }
                        </div>
                      </div>
                    `
                      )
                      .join("")}
                    ${
                      unreadMessages.length > 3
                        ? `<div class="meta" style="margin-top:8px;">+ ${
                            unreadMessages.length - 3
                          } more unread message${
                            unreadMessages.length - 3 === 1 ? "" : "s"
                          }</div>`
                        : ""
                    }
                  </div>
                  `
                      : ""
                  }

                  <div class="button-wrapper">
                    <a href="${process.env.FRONTEND_URL}/messages" class="btn-primary">
                      Open inbox
                    </a>
                  </div>

                  <p class="meta">
                    This link will take you directly to your conversations.
                  </p>

                  <p style="margin-top:18px;">
                    Best regards,<br />
                    <strong>PingUp - Stay Connected</strong>
                  </p>

                  <div class="footer">
                    You’re receiving this email because you have a PingUp account with message notifications enabled.<br />
                    Need help? <a href="mailto:support@pingup.app">Contact support</a>.
                  </div>
                </div>
              </div>
            </body>
            </html>`

      const body = html;

      await sendEmail({
        to : user.email,
        subject,
        body
      })
    }
    return { message: "Unseen messages notifications sent." };
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
  sendConnectionRequestReminder,
  deleteStory,
  sendUnseenMessagesNotification
];
