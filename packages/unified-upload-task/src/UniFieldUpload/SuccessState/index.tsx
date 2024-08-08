import React from 'react';
import {
    FiledIcon,
    DocIcon,
    TxtIcon,
    ExcelIcon,
    PdfIcon,
    UnKnown,
    ImgIcon,
    PptIcon,
    RarIcon,
} from '../svgIcon/file';
import { DeleteIcon } from '../svgIcon/system';
import { SuccessStateProps } from '../types';
import { successContainer, successName, uniFileUploadIcon } from './style';

const SuccessState = ({
    fileData = {},
    setFileData = () => {},
    taskStatus,
    autoSubmit,
}: SuccessStateProps) => {
    const { name } = fileData;
    const iconNames = [
        'doc',
        'docx',
        'txt',
        'xlsx',
        'xls',
        'pdf',
        'ppt',
        'file',
        'img',
        'jpg',
        'jpeg',
        'png',
        'rar',
    ];
    const fileNameSplit = name?.split('.');
    const fileName = fileNameSplit[fileNameSplit.length - 1];
    const fileExtension = iconNames.includes(fileName) ? fileName : 'unKnow';

    const deleteCurrentFileData = () => {
        setFileData({ state: 'default', file: {} });
    };
    const iconMap: any = {
        doc: () => <DocIcon />,
        docx: () => <DocIcon />,
        txt: () => <TxtIcon />,
        xlsx: () => <ExcelIcon />,
        xls: () => <ExcelIcon />,
        pdf: () => <PdfIcon />,
        file: () => <FiledIcon />,
        ppt: () => <PptIcon />,
        unKnow: () => <UnKnown />,
        img: () => <ImgIcon />,
        jpg: () => <ImgIcon />,
        jpeg: () => <ImgIcon />,
        png: () => <ImgIcon />,
        rar: () => <RarIcon />,
    };
    return (
        <div className={successContainer()}>
            <div className={uniFileUploadIcon()}>{iconMap?.[fileExtension]?.()}</div>
            <div className={successName()}>
                {name}{' '}
                {(taskStatus != 'CREATED' || !autoSubmit) && <span onClick={deleteCurrentFileData}>
                    <DeleteIcon />
                </span>}
                
            </div>
        </div>
    );
};

export default SuccessState;
