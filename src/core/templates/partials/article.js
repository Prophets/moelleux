import {
    MjmlText,
} from 'mjml-react';
import Image from '../components/image';
import { H3, P } from '../components/typo';

const Article = () => (
    <>
        <H3>H3 Title</H3>
        <Image fullWidth={true} src="header.jpg" />
        <P>Description <strong>strong</strong></P>
    </>
);

export default Article;
