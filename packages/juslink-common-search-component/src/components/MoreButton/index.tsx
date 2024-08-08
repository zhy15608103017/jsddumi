//@ts-nocheck

import { Button, Checkbox, Dropdown, Popover, Space } from "antd"
import React, { useMemo } from "react";
import Icon, { DownOutlined } from '@ant-design/icons';
import { ReactComponent as DragHandle } from '../../assets/drag-handle.svg';
import { moreButtonStyle, overlayStyle, moreBtnStyle } from "./style";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove
} from '@dnd-kit/sortable';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {LanguageType} from '../../constant';
import {useLocaleContent} from '../../hooks';


type MoreButtonProps = {
    activeKeys: any[],
    termOptions: any[],
    onActiveKeyChanged?: (newActiveKeys: string[]) => void,
    onResetActive?: () => void,
    locale?: LanguageType,
}

const DraggableItem: React.FC<any> = (props) => {
    const { children, key, id } = props;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });


    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return <div ref={setNodeRef} className="dragable-item" key={key ?? undefined} style={style} {...attributes}  {...listeners}>
        {children}
    </div>

}

const MoreButton: React.FC<MoreButtonProps> = (props) => {

    const { activeKeys, termOptions, onActiveKeyChanged, onResetActive , locale} = props;
    const localeData = useLocaleContent(locale);


    const sensors = useSensors(
        useSensor(PointerSensor,{
            activationConstraint: {
                delay: 100,
                tolerance: 10,
            },
        }),
    );

    const handleChange = (key, type: 'add' | 'remove') => {
        if (type === 'add') {
            onActiveKeyChanged && onActiveKeyChanged([...activeKeys, key])
        } else {
            onActiveKeyChanged && onActiveKeyChanged(activeKeys.filter(ele => ele !== key))
        }
    }
    const activeTerms = useMemo(() =>
        activeKeys?.reduce((pre,key) => {
            const t = termOptions?.find(ele => ele.key === key);
            if(t)pre.push(t);
            return pre;
        },[]), [activeKeys, termOptions])
    const selectableTerms = useMemo(() => termOptions.filter(ele => !activeKeys.includes(ele.key)), [activeKeys, termOptions])
    return <Popover
        overlayClassName={overlayStyle()}
        content={<div className={moreButtonStyle()}>
            <div className="selected-items-box">
                <label htmlFor="" className="title-wrapper">
                    <span className="title-text">{localeData.searchItemsArea}</span>
                    <span className="recover-btn" onClick={() => onResetActive && onResetActive()} >{localeData.restore}</span>
                </label>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => {
                        const { active, over } = event;
                        if (active.id !== over?.id) {
                            const oldIndex = activeTerms.findIndex((item) => item.key === active.id);
                            const newIndex = activeTerms.findIndex((item) => item.key === over?.id);

                            const movedArr = arrayMove(activeTerms, oldIndex, newIndex);
                            onActiveKeyChanged && onActiveKeyChanged(movedArr?.map(ele => ele.key) || [])
                        }
                    }}
                >
                    <SortableContext
                        items={activeTerms?.map(ele => ele.key)}
                        strategy={verticalListSortingStrategy}>
                        {
                            activeTerms.map((ele) => <DraggableItem id={ele.key}>
                                <div className="item">
                                    <Icon component={DragHandle} />
                                    <Checkbox value={ele.key} checked={true} disabled={ele.sticky} onClick={(e) => {
                                        e.stopPropagation();
                                        handleChange(ele.key, 'remove')
                                    }}>
                                        {ele.label || ele.key}
                                    </Checkbox>
                                </div>
                            </DraggableItem>)
                        }
                    </SortableContext>
                </DndContext>

            </div>
            <div className='to-select-items-box'>
                <label className="title-wrapper">{localeData.searchItems}</label>
                <div>
                    {
                        selectableTerms.map((ele) =>
                            <div className="item" key={ele.key}>
                                <Checkbox value={ele.key} checked={false} disabled={ele.sticky} onChange={() => {
                                    handleChange(ele.key, 'add')
                                }} >
                                    {ele.label || ele.key}
                                </Checkbox>
                            </div>)
                    }
                </div>
            </div>
        </div>}
    >
        <Button onClick={(e) => e.preventDefault()} className={moreBtnStyle()} >
            <Space>
                {localeData.more}
                <DownOutlined />
            </Space>
        </Button>
    </Popover>
}

export default MoreButton