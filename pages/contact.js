import React from 'react'
import Navbar from '@/components/container/navbar/Navbar'
import Container from '@/components/common/Container'
import Footer from '@/components/container/footer/Footer'
import FixNavbar from '@/components/container/navbar/FixNavbar'
import Form from '@/components/container/Form'
export default function contact() {
    return (
        <div>
            <FixNavbar text='text-black' />
            <Navbar />
            <Container className='pt-40 pb-20 px-5 lg:max-w-[830px]'>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-hanken text-7xl font-ivyMedium'>
                        INQUIRE
                    </h2>
                    <p className='pt-16 font-hanken text-lg'>Interested in working together? I can’t wait to hear from you. Use the form below or email directly via mgmt@lilletblanc.com You can provide more information here, like what will happen next or additional routes of communication or just delete this text.</p>
                </div>
            </Container>
            <Container className='pb-40 px-5 lg:max-w-[730px]'>
                <Form />
            </Container>
            <Footer />

        </div>
    )
}
