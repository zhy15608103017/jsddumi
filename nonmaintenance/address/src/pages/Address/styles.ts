import styled from 'styled-components';

export const StSelectBox = styled.div`
  background: rgb(247,247,247);
  padding: 16px;
  width: 100%;
`;

export const StAddressBox = styled.div`
  background: rgb(247,247,247);
  padding: 16px;
`;
const StyleHeaderSelect = styled.div`
  // background: rgb(247,247,247);
  // padding: 10px 10px;
`;

export const StTitleLabel = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #8D9AAD;

  .icon-img{
    margin: 20px auto;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(to bottom, #E4E4E4 0%,#F6F6F6 100%);
    display: flex;
    justify-content: center;
    align-items: center;

    img{
      width: 30px;
      height: 30px;
    }
  }

  .reque{
    color: #ff4d4f;
    padding-right: 3px;
    font-family: SimSun, sans-serif;
  }
`;

export const StyleImgIcon = styled.img`
  display: block;
  width: 21px;
`;

export const StEditIcon = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0;
  bottom: 0;
  svg {
    font-size: 18px;
  }

  .icon {
    display: flex,
    justifyContent: center;
    flexDirection: column;
    paddingRight: 20px;
    fontSize: 20px


  }
`;

export const StShipSelectBox = styled.div`

  .infoBody{
    margin-top: 6px;
    padding: 6px 40px 6px 10px;
    width: 100%;
    border-radius: 4px;
    background: #fff;
    text-overflow: -o-ellipsis-lastline;
  }
`;
export const StShipViewBox = styled.div`
  position: relative;

  .title{
    font-weight: bold;
    color: #333;
    height: 30px;
    line-height: 30px;
  }

  .infoBody{
    position: relative;
    padding: 10px;
    padding-left: 0;
    width: 100%;
    text-overflow: -o-ellipsis-lastline;

  }
`;

// 展示地址详细信息
export const StAddressInfos = styled.div`
  &.small {
    .info-container{
      min-height: 50px;
      height: auto;
    }
    // margin-top: 10px;
    .noDataText{
      display: none;
    }
  }

  .info-container{
    height: 50px;
    line-height: 1.2;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
  
    ::-webkit-scrollbar-thumb {
        background: #e9e9e9;
    }
  }

  .nodata-container{
    color: #999;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 100%;
    font-size: 14px;

    .noDataText{
      
    }

    // .info-btn{
    //   display: inline-block;
    // }
  }

`;