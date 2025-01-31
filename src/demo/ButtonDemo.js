Ext.define('Demo.ButtonDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Button 按钮演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本按钮',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '默认按钮'
            }, {
                xtype: 'button',
                text: '主要按钮',
                ui: 'primary'
            }, {
                xtype: 'button',
                text: '次要按钮',
                ui: 'default'
            }, {
                xtype: 'button',
                text: '警告按钮',
                ui: 'warning'
            }, {
                xtype: 'button',
                text: '危险按钮',
                ui: 'danger'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '2. 图标按钮',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                iconCls: 'fa-solid fa-plus',
                text: '添加'
            }, {
                xtype: 'button',
                iconCls: 'fa-solid fa-pen',
                text: '编辑'
            }, {
                xtype: 'button',
                iconCls: 'fa-solid fa-trash-can',
                text: '删除'
            }, {
                xtype: 'button',
                iconCls: 'fa-solid fa-magnifying-glass',
                text: '搜索'
            }, {
                xtype: 'button',
                iconCls: 'fa-solid fa-arrows-rotate',
                text: '刷新'
            }]
        }, {
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                iconCls: 'fa-solid fa-plus',
                tooltip: '添加'
            }, {
                xtype: 'button',
                iconCls: 'fa-solid fa-pen',
                tooltip: '编辑'
            }, {
                xtype: 'button',
                iconCls: 'fa-solid fa-trash-can',
                tooltip: '删除'
            }, {
                xtype: 'button',
                iconCls: 'fa-solid fa-magnifying-glass',
                tooltip: '搜索'
            }, {
                xtype: 'button',
                iconCls: 'fa-solid fa-arrows-rotate',
                tooltip: '刷新'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. 按钮大小',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '大按钮',
                scale: 'large'
            }, {
                xtype: 'button',
                text: '中按钮',
                scale: 'medium'
            }, {
                xtype: 'button',
                text: '小按钮',
                scale: 'small'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '4. 按钮状态',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'button',
                text: '普通按钮'
            }, {
                xtype: 'button',
                text: '禁用按钮',
                disabled: true
            }, {
                xtype: 'button',
                text: '按下按钮',
                pressed: true
            }, {
                xtype: 'button',
                enableToggle: true,
                text: '切换按钮'
            }]
        }]
    }, {
        xtype: 'panel',
        title: '5. 按钮组',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            items: [{
                xtype: 'buttongroup',
                title: '文档操作',
                columns: 3,
                defaults: {
                    scale: 'small'
                },
                items: [{
                    xtype: 'button',
                    text: '新建',
                    iconCls: 'fa-solid fa-file'
                }, {
                    xtype: 'button',
                    text: '打开',
                    iconCls: 'fa-solid fa-folder-open'
                }, {
                    xtype: 'button',
                    text: '保存',
                    iconCls: 'fa-solid fa-floppy-disk'
                }]
            }, {
                xtype: 'buttongroup',
                title: '编辑操作',
                columns: 3,
                margin: '10 0 0 0',
                defaults: {
                    scale: 'small'
                },
                items: [{
                    xtype: 'button',
                    text: '剪切',
                    iconCls: 'fa-solid fa-scissors'
                }, {
                    xtype: 'button',
                    text: '复制',
                    iconCls: 'fa-solid fa-copy'
                }, {
                    xtype: 'button',
                    text: '粘贴',
                    iconCls: 'fa-solid fa-paste'
                }]
            }]
        }]
    }, {
        xtype: 'panel',
        title: '6. 分割按钮',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            defaults: {
                margin: '0 10 10 0'
            },
            items: [{
                xtype: 'splitbutton',
                text: '保存',
                iconCls: 'fa-solid fa-floppy-disk',
                menu: [{
                    text: '保存',
                    iconCls: 'fa-solid fa-floppy-disk'
                }, {
                    text: '另存为...',
                    iconCls: 'fa-solid fa-floppy-disk'
                }, {
                    text: '保存全部',
                    iconCls: 'fa-solid fa-floppy-disk'
                }]
            }, {
                xtype: 'splitbutton',
                text: '导出',
                iconCls: 'fa-solid fa-download',
                menu: [{
                    text: '导出为PDF',
                    iconCls: 'fa-solid fa-file-pdf'
                }, {
                    text: '导出为Excel',
                    iconCls: 'fa-solid fa-file-excel'
                }, {
                    text: '导出为Word',
                    iconCls: 'fa-solid fa-file-word'
                }]
            }]
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Button</strong>组件提供了丰富的按钮功能:</p>' +
                '<ul>' +
                '<li>基本按钮: 不同样式的按钮</li>' +
                '<li>图标按钮: 支持图标和提示</li>' +
                '<li>按钮大小: 支持不同尺寸</li>' +
                '<li>按钮状态: 禁用、按下、切换等</li>' +
                '<li>按钮组: 组合多个按钮</li>' +
                '<li>分割按钮: 带下拉菜单的按钮</li>' +
                '</ul>' +
                '<p>按钮组件可以与其他组件灵活组合使用。</p>' +
                '</div>'
        }]
    }
}); 