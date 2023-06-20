
import React from "react";
import { InitUpload } from '@jusda-tools/jusda-file-upload';
import { Upload } from "antd";
const initUpload = new InitUpload();

const fileUpload = (file,fileList) => {
    initUpload.initFileUploadFn(file, 'cp-manager', file.name || '').then((res) => {
        console.log('res: ', res);
    }).catch((err) =>{
        console.log('err: ', err);
    })
}

const App = () => {
    
    return (
        <div>
            <Upload
                beforeUpload={(file,fileList)=>fileUpload(file,fileList)}
                className="avatar-uploader"
            >
                <button>上传</button>
            </Upload>
        </div>
    );
};

export default App;