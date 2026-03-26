import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

export default function VideoCall() {
  const { roomId } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const chatId = searchParams.get("chatId");
  const recipientId = searchParams.get("recipientId");

  const navigate = useNavigate();
  const containerRef = useRef(null);

  const token = localStorage.getItem("token");
  const userData = JSON.parse(atob(token.split('.')[1]));
  const userId = userData.id.toString();
  const userName = userData.name || "User_" + userId;

  const myMeeting = async (element) => {
    const appId = 1559660788;
    const serverSecret = "923e516be63a483538f3a7cc6a98fa3e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      userId,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false,
      turnOnCameraWhenJoining: true,
      turnOnMicrophoneWhenJoining: true,
      showScreenSharingButton: false,
      showTextChat: false,
      showUserList: false,
      showAudioVideoSettingsButton: false,
      showLayoutButton: false,
      showLeavingView: false,
      onLeaveRoom: () => {
        socket.emit("leave_video_room", { roomId, chatId, recipientId });
        navigate('/chat');
      },
      // Simplified UI for Instagram-like feel
      layout: "Auto",
      maxUsers: 2,
    });
  };

  useEffect(() => {
    if (chatId) {
      socket.emit("join", userId);
      socket.emit("join_video_room", { roomId, chatId, recipientId });
    }

    if (containerRef.current) {
      myMeeting(containerRef.current);
    }

    return () => {
      socket.emit("leave_video_room", { roomId, chatId, recipientId });
    };
  }, [roomId, chatId]);

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center animate-in fade-in duration-700 overflow-hidden">
      <div className="w-full h-full" ref={containerRef} />
    </div>
  );
}
