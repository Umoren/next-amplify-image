import { Storage } from 'aws-amplify';
import { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';



export default function Home() {
  const [images, getImages] = useState([])
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState(0)
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      await Storage.put(file.name, file, {
        contentType: "image/*", // contentType is optional
        progressCallback(progress) {
          const progressComputation = (progress.loaded / progress.total) * 100
          setProgress(Math.floor(progressComputation))
          setFile(file)
        },
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
  }
  const getUploadedImage = async () => {
    await Storage.list('') // for listing ALL files without prefix, pass '' instead
      .then((response) => {
        getImages(response.results[0].key)
      })
      .catch((err) => console.log(err));
  }

  const pageLinks = [
    {
      href: "/placeholder",
      title: "Blur-up placeholder"
    },
    {
      href: "/fill",
      title: "Fill dimensions of parent element"
    },
    {
      href: "/responsive",
      title: "Responsive"
    },
    {
      href: "/background",
      title: "Text on background image"
    },
  ]



  useEffect(() => {
    getUploadedImage()

  }, [])


  return (
    <div className="p-2">

      <main className="min-h-screen max-w-screen-lg mx-auto sm:p-16 flex flex-1 flex-col font-karla">
        <header>
          <h1 className='mb-4 text-4xl text-center font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl'> Nextjs Image Optimization Demo with Amplify Storage</h1>

          <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'> This demonstrates the usage of the <code className='text-orange-500'>next/image</code> component with Amplify Storage as image source.</p>
          <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'> This demo assumes you use Amplify Storage for images. We will also be implementing the examples in this Nextjs Image
            <Link href={'https://image-component.nextjs.gallery/'} className='font-medium text-blue-600 dark:text-blue-500 hover:underline' passHref> example. </Link>
          </p>
        </header>

        <section className="my-12">
          <h2 className='text-4xl font-extrabold dark:text-gray-900'> Upload Image to Amplify Storage</h2>
          <p className='my-4 text-lg text-gray-500'> Here, we upload images to an AWS S3 bucket</p>


          {progress === 0 ?
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={onChange} aria-describedby="file_input_help" />
              </label>
            </div> :
            <div className=''>
              <h5 className="text-xl font-semibold dark:text-gray-700">{file.name}</h5>
              <p className='text-base text-gray-500 dark:text-gray-400'> Size: {bytesToSize(file.size)} </p>
            </div>
          }

          <div className="w-full bg-gray-200 rounded dark:bg-gray-700 mt-4">
            <div className="bg-blue-300 text-xs font-medium  text-blue-100 text-center p-0.5 leading-none rounded" style={{ width: progress + '%' }}> {progress}%</div>
          </div>
        </section>

        <section className="my-12">
          <h2 className='text-4xl font-extrabold dark:text-gray-900'>The Uploaded Image </h2>
          <p className='my-4 text-lg text-gray-500'> For the purpose of this demo, we will display just the first image in the s3 bucket</p>
          <div>
            <Image
              src={`https://nextimagedemo10161247-dev.s3.amazonaws.com/public/${images}`}
              alt="Picture of the author"
              width={300}
              height={300}
              unoptimized={true}
            />
          </div>
        </section>

        <section className="my-12">
          <h2 className='text-4xl font-extrabold dark:text-gray-900'>Optimizing the Image  </h2>
          <p className='my-4 text-lg text-gray-500'> The image we retrieved from S3 was unoptimized. Here are the optimization features Nextjs offers: </p>
          <ul className="space-y-1 max-w-md list-none list-inside text-gray-500 dark:text-gray-400">
            {pageLinks.map((page, i) => (
              <li key={i}>
                <Link
                  href={{
                    pathname: page.href,
                    query: images
                  }}
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

    </div>
  )
}
