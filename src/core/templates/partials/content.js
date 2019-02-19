import {
    MjmlSection,
    MjmlButton,
    MjmlImage,
    MjmlText,
    MjmlColumn
} from 'mjml-react';


const Content = ({intro, button, outro, img}) => (
    <MjmlSection>
        <MjmlColumn>
            <MjmlText>{intro}</MjmlText>
            {
                button &&
                <MjmlButton href={button.url}>{button.txt}</MjmlButton>
            }
            <MjmlText>{outro}</MjmlText>
        </MjmlColumn>
    </MjmlSection>
);

export default Content;
