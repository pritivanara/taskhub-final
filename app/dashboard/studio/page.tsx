"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

export default function StudioPage() {

  const [image, setImage] = useState<File | null>(null)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState("")
const [style, setStyle] = useState("Studio")
const [quality, setQuality] = useState("HD")

  const onDrop = useCallback((acceptedFiles: File[]) => {

    setImage(acceptedFiles[0])

  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    }
  })

  return (

    <div className="p-10 min-h-screen bg-black text-white">

      <h1 className="text-4xl font-bold mb-8">
        AI Product Studio
      </h1>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-white p-20 text-center cursor-pointer rounded"
      >

        <input {...getInputProps()} />

        <p>
          Drag & drop product image here
        </p>

      </div>

      {
        image && (

          <div className="mt-10">

            <h2 className="text-2xl mb-4">
              Uploaded Image
            </h2>
            <div className="mt-8 grid grid-cols-3 gap-4">

            <input
                type="text"
                placeholder="Describe your product scene..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="col-span-3 border border-white/10 bg-black/40 p-4 rounded-xl text-white outline-none"
            />

            <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="border border-white/10 bg-black/40 p-4 rounded-xl"
            >
                <option>Studio</option>
                <option>Luxury</option>
                <option>Minimal</option>
                <option>Cyberpunk</option>
            </select>

            <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="border border-white/10 bg-black/40 p-4 rounded-xl"
            >
                <option>HD</option>
                <option>4K</option>
                <option>Ultra</option>
            </select>

            <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold hover:scale-105 transition"
            >
                AI Ready
            </button>

            </div>
            <button
            onClick={() => {

            setLoading(true)

            setTimeout(() => {

                const imageSets: any = {

                    Studio: [
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                    ],

                    Luxury: [
                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
                        "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
                        "https://images.unsplash.com/photo-1585386959984-a41552231658"
                    ],

                    Minimal: [
                        "https://images.unsplash.com/photo-1560343090-f0409e92791a",
                        "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
                        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
                    ],

                    Cyberpunk: [
                        "https://images.unsplash.com/photo-1518770660439-4636190af475",
                        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
                        "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                    ]
                    }

                    setGeneratedImages(imageSets[style])

                setLoading(false)

            }, 3000)
            }}
            className="bg-white text-black px-6 py-3 rounded mt-5"
            >
            Generate AI Photos
            </button>
            {
            generatedImages.length > 0 && (

                <div className="mt-10">
                {
                loading && (

                    <p className="mt-5 text-xl">
                    Generating AI Photos...
                    </p>
                )
                }
                <h2 className="text-3xl mb-5">
                    Generated Photos
                </h2>

                <div className="grid grid-cols-3 gap-5">

                    {
                    generatedImages.map((img, index) => (

                        <div>

                        <img
                            key={index}
                            src={img}
                            alt="Generated"
                            className="rounded"
                        />

                        <a
                            href={img}
                            download
                            target="_blank"
                            className="bg-white text-black px-4 py-2 rounded inline-block mt-2"
                        >
                            Download
                        </a>

                        </div>
                    ))
                    }

                </div>

                </div>
            )
            }
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="w-64 rounded"
            />

          </div>
        )
      }

    </div>
  )
}