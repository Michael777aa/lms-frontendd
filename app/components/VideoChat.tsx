"use client";

import React, { useRef, useEffect, useState } from "react";
import Peer from "peerjs";
import { BsCameraVideo, BsTelephoneX } from "react-icons/bs";

const VideoChat = () => {
  const [peerId, setPeerId] = useState<any>("");
  const [connectedPeer, setConnectedPeer] = useState<any>("");
  const [isCalling, setIsCalling] = useState(false);

  const myVideoRef = useRef<HTMLVideoElement>(null);
  const otherVideoRef = useRef<HTMLVideoElement>(null);
  const peerInstance = useRef<Peer | null>(null);

  useEffect(() => {
    // Initialize PeerJS
    const peer = new Peer("sf", {
      host: "peerjs-server.com", // Replace with your PeerJS server if needed
      port: 9000, // Use the correct port for your server
      path: "/myapp", // Use the correct path if needed
    });

    peer.on("open", (id) => setPeerId(id)); // Get peer ID when connected
    peer.on("call", (call) => handleIncomingCall(call)); // Listen for incoming calls

    peerInstance.current = peer;

    return () => {
      peer.disconnect(); // Cleanup when component unmounts
    };
  }, []);

  const handleIncomingCall = (call: any) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myVideoRef.current) myVideoRef.current.srcObject = stream;
        call.answer(stream); // Answer the incoming call with our stream

        call.on("stream", (remoteStream: MediaStream) => {
          if (otherVideoRef.current) {
            otherVideoRef.current.srcObject = remoteStream;
          }
        });
      });
  };

  const startCall = () => {
    if (!connectedPeer) {
      alert("Please enter a valid Peer ID.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myVideoRef.current) myVideoRef.current.srcObject = stream;
        const call = peerInstance.current?.call(connectedPeer, stream);
        setIsCalling(true);

        call?.on("stream", (remoteStream: MediaStream) => {
          if (otherVideoRef.current) {
            otherVideoRef.current.srcObject = remoteStream;
          }
        });
      });
  };

  const endCall = () => {
    if (peerInstance.current) {
      peerInstance.current.disconnect();
      setIsCalling(false);
    }
  };

  return (
    <div className="video-chat p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black dark:text-white mb-2">
        Video Chat
      </h3>
      <div className="flex gap-4">
        <div>
          <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            Your Video
          </h4>
          <video
            ref={myVideoRef}
            autoPlay
            muted
            className="w-[150px] h-[100px] rounded-lg"
          />
        </div>
        <div>
          <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            Remote Video
          </h4>
          <video
            ref={otherVideoRef}
            autoPlay
            className="w-[150px] h-[100px] rounded-lg"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4 items-center">
        <input
          type="text"
          placeholder="Enter Peer ID"
          value={connectedPeer}
          onChange={(e) => setConnectedPeer(e.target.value)}
          className="p-2 rounded-md border dark:border-gray-600"
        />
        {!isCalling ? (
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center gap-1"
            onClick={startCall}
          >
            <BsCameraVideo /> Call
          </button>
        ) : (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1"
            onClick={endCall}
          >
            <BsTelephoneX /> End
          </button>
        )}
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your Peer ID:{" "}
          <span className="font-mono text-blue-500">
            {peerId || "Generating..."}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VideoChat;
