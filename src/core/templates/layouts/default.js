import {
    Mjml,
    MjmlHead,
    MjmlTitle,
    MjmlPreview,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlImage,
    MjmlText,
    MjmlFont,
    MjmlAttributes,
    MjmlStyle,
    MjmlAll,
    MjmlButton,
    MjmlClass
} from 'mjml-react';
import SupHeader from '../partials/supheader';
import Footer from '../partials/footer';
import CssStyle from '../components/css-style';
import MjssStyle from '../components/mjss-style';
import MailContext from '../context/mail';

const DefaultHead = ({content, attributes, core, folder}) => (
    <>
        <MjmlTitle>{ content.title }</MjmlTitle>

        <MjssStyle folder={folder} src={`/css/mjss.css`} />

        { (core.fonts || []).map(({name, href}, key) => (
            <MjmlFont key={key} href={href} name={name}/>
        )) }
        <CssStyle folder={folder} src={`/css/styles.css`} inline={true} />
        <CssStyle folder={folder} src={`/css/queries.css`} inline={false} />
    </>
);

const DefaultLayout = (props) => {
    const Head = props.head ? props.head(DefaultHead) : DefaultHead;

    return <MailContext.Provider value={{data:props}}>
        <Mjml>
            <MjmlHead>
                <Head {...props} />
            </MjmlHead>
            <MjmlBody>
                <SupHeader />
                {
                    props.content.blocks.map(({ type, data }, index) => {
                        const Block = require(`../partials/${type}`).default;
                        return <Block {...data} />
                    })
                }
                { props.children }
                <Footer />
            </MjmlBody>
        </Mjml>
    </MailContext.Provider>
}

export default DefaultLayout;
