import {
    Mjml,
    MjmlHead,
    MjmlTitle,
    MjmlWrapper,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlImage,
    MjmlText,
    MjmlFont,
} from 'mjml-react';
import SupHeader from '../partials/supheader';
import Footer from '../partials/footer';
import CssStyle from '../components/css-style';
import MjssStyle from '../components/mjss-style';
import MailContext from '../context/mail';
import Grid from '../components/grid';
import Article from '../partials/article';
import { H2 } from '../components/typo';

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
                    props.content.blocks.map(({ type, data }, key) => {
                        const Block = require(`../partials/${type}`).default;
                        return <Block key={key} {...data} />
                    })
                }
                <MjmlSection>
                    <MjmlColumn>
                        <H2>Grid columns 3 justify left</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid columns="3" justifyContent="left">
                    {
                        props.content.articles.map((article, key) => (
                            <MjmlColumn key={key}>
                                <Article { ...article }/>
                            </MjmlColumn>
                        ))
                    }
                </Grid>
                <MjmlSection>
                    <MjmlColumn>
                        <H2>Grid columns 4 justify right</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid columns="4" justifyContent="right">
                    {
                        props.content.articles.map((article, key) => (
                            <MjmlColumn key={key}>
                                <Article { ...article }/>
                            </MjmlColumn>
                        ))
                    }
                </Grid>
                <MjmlSection>
                    <MjmlColumn>
                        <H2>Grid columns 3 justify stretch</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid columns="3" justifyContent="stretch">
                    {
                        props.content.articles.map((article, key) => (
                            <MjmlColumn key={key}>
                                <Article { ...article }/>
                            </MjmlColumn>
                        ))
                    }
                </Grid>
                <MjmlSection>
                    <MjmlColumn>
                        <H2>Grid columns 2 justify center</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid columns="2" justifyContent="center">
                    {
                        props.content.articles.map((article, key) => (
                            <MjmlColumn key={key}>
                                <Article { ...article }/>
                            </MjmlColumn>
                        ))
                    }
                </Grid>

                <MjmlSection>
                    <MjmlColumn>
                        <H2>Fixed Grid columns 3 justify center verticalAlign center</H2>
                    </MjmlColumn>
                </MjmlSection>
                <Grid columns="3" width="300" responsive={false} justifyContent="center" verticalAlign="middle">
                    {
                        props.content.logos.map((logo, key) => (
                            <MjmlColumn key={key}>
                                <MjmlImage src={logo.src} />
                            </MjmlColumn>
                        ))
                    }
                </Grid>
                { props.children }
                <Footer />
            </MjmlBody>
        </Mjml>
    </MailContext.Provider>
}

export default DefaultLayout;
