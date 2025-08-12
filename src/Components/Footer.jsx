import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const Footer = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="px-6 md:px-16 lg:px-32 mt-60 text-sm text-gray-500"
    >
      <motion.div
        variants={fadeInUp}
        className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'
      >
        <motion.div variants={fadeInUp} custom={1}>
          <img src={assets.logo} alt="logo" className='h-8 md:h-9' />
          <p className='max-w-80 mt-3 text-green-700'>
            Premium car rental service with a wide selection of luxury
            and everyday vehicles for all your driving needs.
          </p>
          <div className='flex items-center gap-3 mt-6'>
            <a href="#"><img src={assets.facebook_logo} className='w-5 h-5' alt="" /></a>
            <a href="#"><img src={assets.instagram_logo} className='w-5 h-5' alt="" /></a>
            <a href="#"><img src={assets.twitter_logo} className='w-5 h-5' alt="" /></a>
            <a href="#"><img src={assets.gmail_logo} className='w-5 h-5' alt="" /></a>
          </div>
        </motion.div>

        {[
          {
            title: 'Quick Links',
            links: ['Home', 'Browse Cars', 'List your car', 'About Us']
          },
          {
            title: 'Resources',
            links: ['Help Center', 'Terms of Service', 'Privacy Policy', 'Insurance']
          },
          {
            title: 'Contact',
            links: ['1234 Luxury', 'San Francisco, CA 98567', '+1 324 56677', 'info@example.com']
          }
        ].map((section, idx) => (
          <motion.div key={idx} variants={fadeInUp} custom={idx + 2}>
            <h2 className='text-base font-medium text-gray-900 uppercase'>{section.title}</h2>
            <ul className='mt-3 flex flex-col gap-1.5'>
              {section.links.map((link, i) => (
                <li key={i}><a href="#">{link}</a></li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        custom={6}
        className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'
      >
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
        <ul className='flex items-center gap-4'>
          <li><a href="#">Privacy</a></li>
          <li>|</li>
          <li><a href="#">Terms</a></li>
          <li>|</li>
          <li><a href="#">Cookies</a></li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
