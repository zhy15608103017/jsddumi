import styled from 'styled-components';

export const StAddressBox = styled.div`
  background: rgb(247,247,247);
  padding: 10px 10px;
`;
const StyleHeaderSelect = styled.div`
  // background: rgb(247,247,247);
  // padding: 10px 10px;
`;

export const StTitleLabel = styled.div`
  padding-top: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #8D9AAD;

  .icon{
      text-align: center;

      .reque{
        color: #ff4d4f;
        padding-right: 3px;
        font-family: SimSun, sans-serif;
      }
  }
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
    }
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
  top: 30px;
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

export const StShipSelectTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
`;

export const StShipSelectBody = styled.div`
  position: relative;

  .infoBody{
    position: absolute;
    z-index: 1;
    margin-top: 6px;
    padding: 6px 40px 6px 10px;
    width: 100%;
    border-radius: 4px;
    background: #fff;
    transition: all 0.3s;
    opacity: 0;
    text-overflow: -o-ellipsis-lastline;

    &.show{
      opacity: 1;
    }
  }

  .FormItemsBody{
    z-index: 9;
    transition: all 0.3s;
    max-height: 0;
    position: relative;
    overflow: hidden;

    &.show{
      max-height:500px;
    }
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

  }
`;

// 展示地址详细信息
export const StAddressInfos = styled.div`

  .info-container{
    height: 50px;
    line-height: 1.2;
    overflow-y: scroll;
    
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
      cursor: pointer;
      color: rgb(81, 128, 186);
    }
  }

`;