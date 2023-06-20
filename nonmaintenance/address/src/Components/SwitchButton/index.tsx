import React from 'react';
import { NewButton } from '../../Components/CustomElement';
import { SwitchIcon } from '../../assets/SvgIcon/Svg';
import { addressIntl } from '../../Intl';

const { address } = addressIntl;

const SwitchButton = ({ handleSwitchManualInput, style }: any) => {
    return (
        <div style={{ position: 'absolute', right: 0, ...style }}>
            <NewButton
                onClick={() => {
                    handleSwitchManualInput(false);
                }}
            >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <SwitchIcon />
                </span>
                {address['Switch to automatic mode']}
            </NewButton>
        </div>
    );
};

export default SwitchButton;
