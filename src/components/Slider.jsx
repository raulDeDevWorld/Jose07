import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';
import 'react-animated-slider/build/horizontal.css';

export default function ({content}) {


 return    (
<Slider autoplay={3000}>
	{content.map((item, index) => (
		<div
			key={index}
			style={{ background: `url('${item.image}') no-repeat center center` }}
		>
			<div  className="center">
				<h1>{item.title}</h1>
				<p>{item.description}</p>
				<button  className='bg-yellow-400'>{item.button}</button>
			</div>
		</div>
	))}
</Slider>
)}

