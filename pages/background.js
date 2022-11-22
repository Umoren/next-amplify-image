import { useRouter } from "next/router"
import Link from "next/link";
import Image from "next/image";

const Background = () => {
    const router = useRouter();
    const image = Object.keys(router.query);
    // console.log(data)
    return (
        <div className="p-2">

            <main className="min-h-screen max-w-screen-lg mx-auto p-16 flex flex-1 flex-col font-karla">
                <header>
                    <h1 className='mb-4 text-4xl text-center font-extrabold tracking-tight leading-none text-gray-100 md:text-5xl lg:text-6xl'> Nextjs Image Optimization Demo with Amplify Storage</h1>

                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-100'> This demonstrates the usage of the <code className='text-orange-500'>next/image</code> component with Amplify Storage as image source.</p>
                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-100'> This demo assumes you use Amplify Storage for images. We will also be implementing the examples in this Nextjs Image
                        <Link href={'https://image-component.nextjs.gallery/'} className='font-medium text-blue-600 dark:text-blue-500 hover:underline' passHref> example. </Link>
                    </p>
                </header>
                <section>
                    <Image
                        alt={image}
                        src={`https://nextimagedemo10161247-dev.s3.amazonaws.com/public/${image}`}
                        placeholder="blur"
                        blurDataURL={`data:application/xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48RXJyb3I+PENvZGU+SHR0cFZlcnNpb25Ob3RTdXBwb3J0ZWQ8L0NvZGU+PE1lc3NhZ2U+VGhlIEhUVFAgdmVyc2lvbiBzcGVjaWZpZWQgaXMgbm90IHN1cHBvcnRlZC48L01lc3NhZ2U+PFJlcXVlc3RJZD43MkQ4NUVCQkMxQjg3QUVGPC9SZXF1ZXN0SWQ+PEhvc3RJZD5FdWxFc05sTWVLYnBHNStSVlc1bWFFTWlENzJNQ1pCTW8zbytGWmJuVnBYVVJrV1RQZkxoZC9iSWpoa0pUWDJ3czBOSVJQQVcyNGY1U3BwdUNEVkQwK25qQVkvbDNsVDQ8L0hvc3RJZD48L0Vycm9yPg==`}
                        className="fixed min-h-screen max-w-[100vw] overflow-hidden z-[-1]"
                        quality={100}
                        fill
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />

                    <p className="m-0 text-2xl leading-10 text-center pt-[40vh] text-white drop-shadow-lg">
                        Image Component
                        <br />
                        as a Background
                    </p>
                </section>
            </main>

            {/* <img src */}
        </div >
    )
}

export default Background

// .bgWrap {
//     position: fixed;
//     height: 100vh;
//     width: 100vw;
//     overflow: hidden;
//     z-index: -1;
//   }