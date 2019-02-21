import {
    MjmlImage
} from 'mjml-react';
import MailContext from '../context/mail';

const Image = ({ src, srcset, cssClass, fullWidth, ...otherProps }) => (
    <MailContext.Consumer>
        { ({data}) => {
            return <MjmlImage
                fluidOnMobile={true}
                padding="0"
                src={data.imagesDestination +'/'+ src}
                srcset={srcset && srcset.trim().split(',').filter(item => item.trim().length !== 0).map((item)=> {
                    const parts = item.trim().split(' ').filter(item => item !== '');
                    return `${data.imagesDestination}/${parts[0]} ${parts.slice(1).join(' ')}`;
                })}
                {...otherProps} />
        }}
    </MailContext.Consumer>
)

export default Image;
