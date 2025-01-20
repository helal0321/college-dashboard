// app/yourpage/page.js (or pages/yourpage.js depending on your Next.js version)
export default function YourPage() {
  const title =
    "Eighth place for student Ziad Tariq in the 50 freestyle swimming";
  const description = `
    Dr. Ahmed Akkawi, President of South Valley University, will receive a delegation from 
    the Meteorological Authority. This cooperation strengthens the research efforts between Dr. Ahmed Akkawi, President of South Valley University, will receive a delegation from 
    the Meteorological Authority. This cooperation strengthens the research efDr. Ahmed Akkawi, President of South Valley University, will receive a delegation from Dr. Ahmed Akkawi, President of South Valley University, will receive a delegation from 
    the Meteorological Authority. This cooperation strengthens the research ef
    the Meteorological Authority. This cooperation strengthens the research efDr. Ahmed Akkawi, President of South Valley University, will receive a delegation from 
    the Meteorological Authority. This cooperation strengthens the research efDr. Ahmed Akkawi, President of South Valley University, will receive a delegation from 
    the Meteorological Authority. This cooperation strengthens the research ef the institutions, focusing on climate change studies and upper monitoring stations.
  `;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "0",
        background: "#3B82F6",
      }}
    >
      {/* Main Container */}
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "900px",

          backgroundColor: "#fff",
          borderRadius: "8px",

          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Image Section (Minimized) */}
        <div
          style={{
            flex: "0 0 30%", // Makes the image section take up only 30% of the container
          }}
        >
          <img
            src="https://picsum.photos/300/400" // Random image link
            alt="Random"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Content Section (Takes most of the container space) */}
        <div
          style={{
            flex: "1", // Takes up remaining space
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "#333",
          }}
        >
          {/* Title */}
          <h2
            style={{ fontSize: "2rem", color: "#003366", marginBottom: "10px" }}
          >
            {title}
          </h2>

          {/* Description */}
          <p style={{ lineHeight: "1.6", fontSize: "1rem" }}>{description}</p>
        </div>
      </div>
    </div>
  );
}
