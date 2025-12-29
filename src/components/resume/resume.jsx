import React from "react";

const ClauResume = () => {
  const pdfUrl = `${process.env.PUBLIC_URL}/media/PDFs/Claudius_Marco_Andrew_resumeF25.pdf`;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default ClauResume;
