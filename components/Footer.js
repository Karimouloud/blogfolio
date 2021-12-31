import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

export default function Footer() {

  const social = [
    {
        href: "https://www.facebook.com/",
        name: "Facebook",
        icon: <FaFacebook className='w-8 h-8 cursor-pointer' />
    },{
        href: "https://www.instagram.com/",
        name: "Instagram",
        icon: <FaInstagram className='w-8 h-8 cursor-pointer' />
    },{
        href: "https://twitter.com/home",
        name: "Twitter",
        icon: <FaTwitter className='w-8 h-8 cursor-pointer' />
    },{
        href: "https://github.com/",
        name: "Github",
        icon: <FaGithub className='w-8 h-8 cursor-pointer' />
    },{
        href: "https://dribbble.com/",
        name: "Dribbble",
        icon: <FaDribbble className='w-8 h-8 cursor-pointer' />
    },
  ]

  return (
    <div className="flex flex-col justify-center mt-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-0" >
      <div className='mt-8 flex justify-center space-x-6'>
        {social.map((item) => (
          <a 
            key={item.name} 
            className='text-blue-700 hover:text-gray-700'
            href={item.href}
            aria-hidden="true"
          >
              {item.icon}
          </a>
        ))}
      </div>
      <div className="text-gray-700 hover:text-blue-700 text-center mt-4" >
        &copy;
        {new Date().getFullYear()}
        Awesome Portfolio    
      </div>    
    </div>
  )
}
