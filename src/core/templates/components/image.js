import {
    MjmlImage,
    MjmlClass
} from 'mjml-react';
import MailContext from '../context/mail';

const Image = ({ src, srcset, cssClass, fullWidth, ...otherProps }) => {
    const { data } = React.useContext(MailContext);
    return <MjmlImage
        mjClass='image'
        src={data.imagesDestination +'/'+ src}
        srcset={srcset && srcset.trim().split(',').filter(item => item.trim().length !== 0).map((item)=> {
            const parts = item.trim().split(' ').filter(item => item !== '');
            return `${data.imagesDestination}/${parts[0]} ${parts.slice(1).join(' ')}`;
        })}
        {...otherProps}
    />
}
Image.style = (props) => <MjmlClass name="image" {...props} /> ;

export default Image;
