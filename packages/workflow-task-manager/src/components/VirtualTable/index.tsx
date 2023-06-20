/* eslint-disable @typescript-eslint/explicit-function-return-type */
//@ts-nocheck
import { Empty, Table } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import ResizeObserver from "rc-resize-observer";
import NodataPNG from '../../assets/icon/nodata.png';
import "./index.less";

const VirtualTable = (props: Parameters<typeof Table>[0]) => {
    const { columns, scroll, className } = props;
    const [tableWidth, setTableWidth] = useState(0);

    let usedWidth = 0;
    const widthColumnCount = columns!.filter(({ width }) => {
        if (width) {
            if(typeof width === "number") {
                usedWidth+=width;
            }else if (width.match(/^\d+%$/)) {
                usedWidth +=
                    parseInt(width.replace(/%$/, "")) * 0.01 * tableWidth;
            }else {
                usedWidth += parseInt(width);
            } 
        }
        return !width;
    }).length;
    const mergedColumns = columns!.map((column) => {
        if (column.width) {
            return column;
        }

        return {
            ...column,
            width: Math.floor((tableWidth - usedWidth)/ widthColumnCount),
        };
    });

    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
        const obj = {};
        Object.defineProperty(obj, "scrollLeft", {
            get: () => null,
            set: (scrollLeft: number) => {
                if (gridRef.current) {
                    gridRef.current.scrollTo({ scrollLeft });
                }
            },
        });

        return obj;
    });

    const resetVirtualGrid = () => {
        gridRef.current?.resetAfterIndices({
            columnIndex: 0,
            shouldForceUpdate: true,
        });
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);

    const renderVirtualList = (
        rawData: object[],
        { scrollbarSize, ref, onScroll }: any
    ) => {
        ref.current = connectObject;
        const totalHeight = rawData.length * 39;
        if(rawData.length === 0) {
            return <Empty image={NodataPNG} description={''} imageStyle={{marginTop: 20}}/>;
        }
        return (
            <Grid
                ref={gridRef}
                className="virtual-grid"
                columnCount={mergedColumns.length}
                columnWidth={(index: number) => {
                    const { width } = mergedColumns[index];
                    return totalHeight > scroll!.y! &&
                        index === mergedColumns.length - 1
                        ? (width as number) - scrollbarSize - 1
                        : (width as number);
                }}
                height={scroll!.y as number}
                rowCount={rawData.length}
                rowHeight={() => 39}
                width={tableWidth}
                onScroll={({ scrollLeft }: { scrollLeft: number }) => {
                    onScroll({ scrollLeft });
                }}
            >
                {({
                    columnIndex,
                    rowIndex,
                    style,
                }: {
                    columnIndex: number;
                    rowIndex: number;
                    style: React.CSSProperties;
                }) => (
                    <div
                        className={`virtual-table-cell ${
                            columnIndex === mergedColumns.length - 1
                                ? "virtual-table-cell-last"
                                : ""
                        } ${
                            (mergedColumns as any)[columnIndex]?.ellipsis
                                ? "ellipsis"
                                : ""
                        } ${(mergedColumns as any)[columnIndex]?.align || ""}`}
                        style={style}
                    >
                        {typeof (mergedColumns as any)[columnIndex].render ===
                        "function"
                            ? (mergedColumns as any)[columnIndex].render(
                                  (rawData[rowIndex] as any)[
                                      (mergedColumns as any)[columnIndex]
                                          .dataIndex
                                  ],
                                  rawData[rowIndex]
                              )
                            : (rawData[rowIndex] as any)[
                                  (mergedColumns as any)[columnIndex].dataIndex
                              ]}
                    </div>
                )}
            </Grid>
        );
    };

    return (
        <ResizeObserver
            onResize={({ width }) => {
                console.log("ResizeObserver", width);

                setTableWidth(width);
            }}
        >
            <Table
                {...props}
                className={`virtual-table ${className}`}
                columns={mergedColumns}
                pagination={false}
                components={{
                    body: renderVirtualList,
                }}
            />
        </ResizeObserver>
    );
};

export default VirtualTable;
