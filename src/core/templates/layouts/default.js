import React from 'react';
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
    MjmlStyle
} from 'mjml-react';
import SupHeader from '../partials/supheader';
import Footer from '../partials/footer';
import Style from '../components/style';
import MailContext from '../context/mail';

const DefaultHead = ({content, attributes, core, folder}) => (
    <>
        <MjmlTitle>{ content.title }</MjmlTitle>

        <MjmlAttributes>
            <mj-all font-family="Helvetica, Arial, sans-serif"></mj-all>
            <mj-button target="_blank"></mj-button>
            { attributes }
        </MjmlAttributes>
        { (core.fonts || []).map(({name, href}, key) => (
            <MjmlFont key={key} href={href} name={name}/>
        )) }
        <Style folder={folder} src={`/css/styles.css`} inline={true} />
        <Style folder={folder} src={`/css/queries.css`} inline={false} />
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
