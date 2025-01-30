Ext.define('Demo.FieldDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Field 表单字段演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 文本类字段',
        margin: '0 0 10 0',
        defaults: {
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            defaults: {
                labelWidth: 120,
                margin: '0 0 10 0'
            }
        },
        items: [{
            items: [{
                xtype: 'textfield',
                fieldLabel: '基本文本框',
                emptyText: '请输入文本'
            }, {
                xtype: 'textfield',
                fieldLabel: '带占位符的文本框',
                emptyText: '请输入用户名',
                triggers: {
                    clear: {
                        cls: 'x-form-clear-trigger',
                        handler: function () {
                            this.setValue('');
                        }
                    }
                }
            }, {
                xtype: 'textareafield',
                fieldLabel: '多行文本框',
                grow: true,
                growMin: 60,
                growMax: 100
            }, {
                xtype: 'displayfield',
                fieldLabel: '显示字段',
                value: '这是一个只读的显示字段'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '2. 数字类字段',
        margin: '0 0 10 0',
        defaults: {
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            defaults: {
                labelWidth: 120,
                margin: '0 0 10 0'
            }
        },
        items: [{
            items: [{
                xtype: 'numberfield',
                fieldLabel: '基本数字框',
                value: 0,
                minValue: 0,
                maxValue: 100
            }, {
                xtype: 'numberfield',
                fieldLabel: '带步进的数字框',
                value: 0,
                step: 10,
                minValue: 0,
                maxValue: 100
            }, {
                xtype: 'spinnerfield',
                fieldLabel: '微调数字框',
                value: 50,
                step: 5,
                minValue: 0,
                maxValue: 100
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. 选择类字段',
        margin: '0 0 10 0',
        defaults: {
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            defaults: {
                labelWidth: 120,
                margin: '0 0 10 0'
            }
        },
        items: [{
            items: [{
                xtype: 'combobox',
                fieldLabel: '基本下拉框',
                store: ['选项1', '选项2', '选项3'],
                queryMode: 'local'
            }, {
                xtype: 'combobox',
                fieldLabel: '可搜索下拉框',
                store: {
                    fields: ['value', 'text'],
                    data: [
                        { value: '1', text: '选项一' },
                        { value: '2', text: '选项二' },
                        { value: '3', text: '选项三' }
                    ]
                },
                queryMode: 'local',
                displayField: 'text',
                valueField: 'value',
                typeAhead: true,
                minChars: 1
            }, {
                xtype: 'tagfield',
                fieldLabel: '标签选择框',
                store: {
                    fields: ['value', 'text'],
                    data: [
                        { value: '1', text: '标签一' },
                        { value: '2', text: '标签二' },
                        { value: '3', text: '标签三' },
                        { value: '4', text: '标签四' }
                    ]
                },
                displayField: 'text',
                valueField: 'value',
                filterPickList: true,
                queryMode: 'local'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '4. 日期时间字段',
        margin: '0 0 10 0',
        defaults: {
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            defaults: {
                labelWidth: 120,
                margin: '0 0 10 0'
            }
        },
        items: [{
            items: [{
                xtype: 'datefield',
                fieldLabel: '日期字段',
                format: 'Y-m-d'
            }, {
                xtype: 'timefield',
                fieldLabel: '时间字段',
                format: 'H:i',
                increment: 30
            }, {
                xtype: 'datefield',
                fieldLabel: '带时间的日期',
                format: 'Y-m-d H:i',
                altFormats: 'Y-m-d H:i:s'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '5. 特殊字段',
        margin: '0 0 10 0',
        defaults: {
            xtype: 'container',
            padding: 10,
            style: {
                border: '1px dashed #ccc',
                margin: '10px'
            },
            defaults: {
                labelWidth: 120,
                margin: '0 0 10 0'
            }
        },
        items: [{
            items: [{
                xtype: 'filefield',
                fieldLabel: '文件上传',
                buttonText: '选择文件'
            }, {
                xtype: 'hiddenfield',
                fieldLabel: '隐藏字段',
                value: '隐藏值'
            }, {
                xtype: 'sliderfield',
                fieldLabel: '滑块',
                value: 50,
                increment: 10,
                minValue: 0,
                maxValue: 100
            }, {
                xtype: 'checkboxfield',
                fieldLabel: '复选框',
                boxLabel: '选项1'
            }, {
                xtype: 'radiofield',
                fieldLabel: '单选框',
                boxLabel: '选项1',
                name: 'radio1'
            }, {
                xtype: 'radiofield',
                fieldLabel: '',
                labelSeparator: '',
                boxLabel: '选项2',
                name: 'radio1'
            }]
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Field</strong>组件提供了丰富的表单字段类型:</p>' +
                '<ul>' +
                '<li>文本类: TextField, TextArea, DisplayField等</li>' +
                '<li>数字类: NumberField, SpinnerField等</li>' +
                '<li>选择类: ComboBox, TagField等</li>' +
                '<li>日期时间类: DateField, TimeField等</li>' +
                '<li>特殊类型: FileField, ColorField, SliderField等</li>' +
                '</ul>' +
                '<p>每种字段都提供了丰富的配置选项和事件处理机制。</p>' +
                '</div>'
        }]
    }
}); 