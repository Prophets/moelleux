import {
    MjmlText,
} from 'mjml-react';
import Image from '../components/image';

const Article = () => (
    <>
        <MjmlText>Title</MjmlText>
        <Image fullWidth={true} src="header.jpg" />
        <MjmlText>Description</MjmlText>
    </>
);

export default Article;
