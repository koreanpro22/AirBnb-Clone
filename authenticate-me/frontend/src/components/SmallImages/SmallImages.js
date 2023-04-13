import { NavLink } from 'react-router-dom';
import './SmallImages.css';

const SmallImages = ({ images }) => {

    console.log('small images')
    console.log(images)

    return (
            <div className='small-images-box'>
                <img src={images[0] ? images[0].url : 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg'} className='small-image'></img>
                <img src={images[1] ? images[1].url : 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg'} className='small-image'></img>
                <img src={images[2] ? images[2].url : 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg'} className='small-image'></img>
                <img src={images[3] ? images[3].url : 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg'} className='small-image'></img>
            </div>
    )
}


export default SmallImages
