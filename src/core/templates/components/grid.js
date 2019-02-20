import {
    MjmlSection,
    MjmlColumn,
    MjmlText
} from 'mjml-react';
import chunk from 'lodash/chunk';
import times from 'lodash/times';


const fillUp = (columns, row) => times(Math.max(0, columns - row.length), (item) => (
    <MjmlColumn padding="0" key={item} />
));

const justifyResolve = (value) => {
    const types = {
        left: true,
        right: true,
        stretch: true,
        center: true
    };

    if(types[value]) {
        return value;
    }

    return 'left';
};

const maxWidth = 600;

const calcWidths = (columns, gutter) => {
    const spacerWidth = (gutter/maxWidth) * 100;
    const spacersTotalWidth = (columns - 1) * spacerWidth;

    const columnsLeftOverWidth = 100 - spacersTotalWidth;
    const columnWidth = columnsLeftOverWidth/columns;

    return {
        columnWidth,
        spacerWidth
    }
}
const Grid = ({columns = 2, gutter= 10, children, justify = 'left' }) => {
    return <>
        {
            chunk(React.Children.toArray(children), columns).map((row, key) => {
                let newRow = row;
                let totalColumns = columns;
                if( justifyResolve(justify) === 'stretch' ) {
                    totalColumns = row.length;
                }
                const { columnWidth, spacerWidth } = calcWidths(totalColumns, gutter);

                if( justifyResolve(justify) === 'right') {
                    newRow = fillUp(columns, row).concat(row);
                }

                if( justifyResolve(justify) === 'left') {
                    newRow = row.concat(fillUp(columns, row));
                }

                return <MjmlSection padding="0" key={key}>
                    {
                        newRow.map((item, key) => {
                            const column = React.cloneElement(item,{
                                key: 'column-' + key,
                                ...item.props,
                                mjClass: (item.props.mjClass || '' ) + ' grid__item',
                                cssClass: (item.props.cssClass || '') + ' grid__item',
                                width: `${columnWidth}%`
                            })

                            return <>
                                { column }
                                { key < columns - 1 &&
                                    <MjmlColumn cssClass="grid__gutter" padding="0" width={`${spacerWidth}%`} mjClass="grid__gutter" />
                                }
                            </>
                        })
                    }
                </MjmlSection>
            })
        }
    </>
};

export default Grid;
