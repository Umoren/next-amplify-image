import { useRouter } from "next/router"
import Link from "next/link";
import Image from "next/image";

const Responsive = () => {
    const router = useRouter();
    const image = Object.keys(router.query);
    return (
        <div className="p-2">

            <main className="min-h-screen max-w-screen-lg mx-auto p-16 flex flex-1 flex-col font-karla">
                <header>
                    <h1 className='mb-4 text-4xl text-center font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl'> Nextjs Image Optimization Demo with Amplify Storage</h1>

                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'> This demonstrates the usage of the <code className='text-orange-500'>next/image</code> component with Amplify Storage as image source.</p>
                    <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl  dark:text-gray-400'> This demo assumes you use Amplify Storage for images. We will also be implementing the examples in this Nextjs Image
                        <Link href={'https://image-component.nextjs.gallery/'} className='font-medium text-blue-600 dark:text-blue-500 hover:underline' passHref> example. </Link>
                    </p>
                </header>

                <section>
                    <h2 className='text-4xl font-extrabold dark:text-gray-900'> Image Component with Layout Responsive </h2>
                    <p className='my-4 text-lg text-gray-500'>
                        This uses the sizes property to configure how next/image automatically generates an image source set.
                    </p>
                    <Image
                        alt={image}
                        src={`https://nextimagedemo1112419-dev.s3.amazonaws.com/public/${image}`}
                        width={700}
                        height={475}
                        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </section>
            </main>
        </div>
    )
}

export default Responsive