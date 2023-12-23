import logoimage from '../images/WHlogo.png'
import footerimage from '../images/footerimage.png'
export const Footer = () => {
  return (
    <div className='flex flex-col border border-gray-200 mt-10'>
    <div className='flex items-center justify-between p-6'>
        <div className="mt-2">
            <img src={logoimage} alt="logoimage" width={90} className='mt-2'/>
            <span className='text-gray-400'>Unveiling Comfort, Creating Dreams <br/> Your Key to Effortless Living.</span>
        </div>

        <div className='flex flex-col'>
            
            <span className='font-bold text-2xl text-blue-900'>Information</span>
            <span className='text-gray-400'>Tampa, Florida</span>
            <span className='text-gray-400'>willowhomes@gmail.com</span>
            
        </div>
    </div>
    <img className='bg-cover h-[80px] mt-12 opacity-20' src={footerimage} alt="footer image" />
    </div>
  )
}

