import Button from './Button'
import Image from 'next/image'


export default function Card(props) {
    return (
        <div className='pt-3 w-[90%] lg:w-[20vw]  lg:h-[22vw] flex flex-col justify-end items-center bg-[#062f5f9c] p-5 m-5 rounded-[20px]'>
            
                <img src={props.img} className='w-[30vw] pb-5' alt="User" />
        
            <Button
                theme={"Primary"}
                click={props.click}>
                {props.buttonText} 
            </Button> 
        </div>
    )
}