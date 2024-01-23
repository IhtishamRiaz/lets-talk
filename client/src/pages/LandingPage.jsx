import React, { useEffect } from 'react';
import Button from '../components/Button'
import { Link } from 'react-router-dom';
import { useAnimate, stagger } from 'framer-motion';
import useTitle from '../hooks/useTitle';

const LandingPage = () => {
    useTitle('StockUp');
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const enterAnimation = async () => {
            animate(
                'nav',
                { y: [-60, 0] },
                { duration: 0.4, delay: 0.5, type: "spring", stiffness: 220, damping: 13 },
            );
            animate(
                'span',
                { y: [50, 5, 0], opacity: [0, 1] },
                { duration: 0.4, delay: stagger(0.15, { startDelay: 1 }), type: "spring", stiffness: 200, damping: 15 },
            );
            // animate(
            //     '.name-1',
            //     { y: [50, 5, 0], opacity: [0, 1] },
            //     { duration: 0.4, delay: 1 },
            // );
            // animate(
            //     '.name-2',
            //     { y: [50, 5, 0], opacity: [0, 1] },
            //     { duration: 0.4, delay: 1.2 },
            // );
            // animate(
            //     '.name-3',
            //     { y: [50, 5, 0], opacity: [0, 1] },
            //     { duration: 0.4, delay: 1.4 },
            // );
            // animate(
            //     '.name-4',
            //     { y: [50, 5, 0], opacity: [0, 1] },
            //     { duration: 0.4, delay: 1.3 },
            // );
            // animate(
            //     '.name-5',
            //     { y: [50, 5, 0], opacity: [0, 1] },
            //     { duration: 0.4, delay: 1.5 },
            // );
            animate(
                '.para',
                { opacity: [0, 1] },
                { duration: 0.6, delay: 2.2 },
            );
            animate(
                '.btn',
                { opacity: [0, 1, 1], scale: [0.5, 1.1, 1] },
                { duration: 0.5, delay: 2.7 },
            );
        }
        enterAnimation();

    }, [])

    return (
        <div ref={scope} className="flex items-center justify-center h-screen bg-[url(/images/landingBg.png)] bg-center bg-no-repeat bg-cover">
            <nav className='fixed top-0 w-full'>
                <div className='container flex items-center justify-between p-4 mx-auto max-w-7xl'>
                    <p className='text-4xl font-extrabold'><Link to={'/'}>StockUp</Link></p>
                    <section className='flex space-x-4'>
                        <Link to={'/login'}>
                            <Button secondary>Sign In</Button>
                        </Link>
                        <Link to={'/register'}>
                            <Button>Sign Up</Button>
                        </Link>
                    </section>
                </div>
            </nav>
            <main>
                <h1 className='font-extrabold leading-[4.5rem] text-gray-900 text-6xl text-center'>
                    <span className='inline-block name-1'>Professional&nbsp;</span>
                    <span className='inline-block name-2'>Inventory&nbsp;</span>
                    <span className='inline-block text-primary-600 name-3'>Management,&nbsp;</span><br />
                    <span className='inline-block name-4'>Made&nbsp;</span>
                    <span className='inline-block name-5'>Efficient.</span>
                </h1>
                {/* <p className='mt-5 text-xl leading-8 text-center'>
                    Experience the next level of inventory management with our advanced solution.<br />Elevate your resource and operational efficiency like never before.
                </p> */}
                <p className='mt-5 text-xl leading-8 text-center para'>
                    Inventory system to control and manage proucts in the warehouse in real time and<br />integrated to make it easier to develop your business.
                </p>
                <section className='flex items-center justify-center mt-8'>
                    <Link to={'/register'}>
                        <Button className='px-6 py-3 text-xl rounded-full btn'>
                            Get Started
                        </Button>
                    </Link>
                </section>
            </main>
        </div>
    )
}

export default LandingPage;