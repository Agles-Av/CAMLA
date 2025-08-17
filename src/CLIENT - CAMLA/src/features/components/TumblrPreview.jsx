import React from "react"

// Previsualización tipo Tumblr para un catálogo
const TumblrPreview = ({ contenidoJson }) => {
  let pages = []
  try {
    const parsed = typeof contenidoJson === "string" ? JSON.parse(contenidoJson) : contenidoJson
    pages = parsed.pages || []
  } catch {
    pages = []
  }

  // Tomar la primera página para la preview
  const page = pages[0]
  if (!page) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">Sin contenido</div>
    )
  }

  // Mostrar hasta 3 elementos visuales (imágenes, cards, shapes, texto)
  const elements = page.elements.slice(0, 3)

  return (
    <div className="flex w-full h-full gap-2 p-2 overflow-hidden">
      {elements.map((el) => {
        if (el.type === "image") {
          return (
            <img
              key={el.id}
              src={el.data.url || "/preview.png"}
              alt={el.data.nombre}
              style={{
                width: 60,
                height: 60,
                objectFit: "cover",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
          )
        }
        if (el.type === "card") {
          return (
            <div
              key={el.id}
              style={{
                width: 60,
                height: 60,
                background: el.data.background || "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                border: el.data.border || "1px solid #eee",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                padding: 4,
                overflow: "hidden",
              }}
            >
              {el.data.image && (
                <img
                  src={el.data.image}
                  alt={el.data.title || "Imagen"}
                  style={{ width: "100%", maxHeight: 24, objectFit: "cover", borderRadius: 4, marginBottom: 2 }}
                />
              )}
              <div style={{ fontWeight: "bold", fontSize: 10 }}>{el.data.title || "Card"}</div>
            </div>
          )
        }
        if (el.type === "shape") {
          return (
            <div
              key={el.id}
              style={{
                width: 60,
                height: 60,
                background: el.data.fillColor,
                border: `${el.data.borderWidth}px solid ${el.data.borderColor}`,
                borderRadius: el.data.shapeType === "circle" ? "50%" : `${el.data.borderRadius}px`,
              }}
            />
          )
        }
        if (el.type === "text") {
          return (
            <div
              key={el.id}
              style={{
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: el.data.color,
                fontFamily: el.data.fontFamily,
                fontWeight: el.data.fontWeight,
                background: "#f9f9f9",
                borderRadius: 8,
                padding: 4,
                overflow: "hidden",
                textAlign: el.data.textAlign,
              }}
            >
              {el.data.text}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export default TumblrPreview
