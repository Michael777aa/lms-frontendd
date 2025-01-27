import React, { FC, useEffect, useState } from "react";
import axios from "axios";
type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`http://localhost:3030/course/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);
  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          style={{
            border: "0",
            width: "90%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=7MVPFxyODte4StTK`}
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
