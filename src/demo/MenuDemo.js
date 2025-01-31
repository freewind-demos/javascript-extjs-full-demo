Ext.define('Demo.MenuDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Menu 菜单演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    items: [{
        xtype: 'panel',
        title: '1. 基本菜单',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            items: [{
                xtype: 'button',
                text: '点击显示菜单',
                menu: {
                    items: [{
                        text: '新建',
                        iconCls: 'fa-solid fa-file'
                    }, {
                        text: '打开',
                        iconCls: 'fa-solid fa-folder-open'
                    }, {
                        text: '保存',
                        iconCls: 'fa-solid fa-floppy-disk'
                    }, '-', {
                        text: '退出',
                        iconCls: 'fa-solid fa-right-from-bracket'
                    }]
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '2. 子菜单',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            items: [{
                xtype: 'button',
                text: '带子菜单的菜单',
                menu: {
                    items: [{
                        text: '文件',
                        menu: {
                            items: [{
                                text: '新建文件'
                            }, {
                                text: '新建文件夹'
                            }]
                        }
                    }, {
                        text: '编辑',
                        menu: {
                            items: [{
                                text: '剪切'
                            }, {
                                text: '复制'
                            }, {
                                text: '粘贴'
                            }]
                        }
                    }, {
                        text: '视图',
                        menu: {
                            items: [{
                                text: '大图标'
                            }, {
                                text: '小图标'
                            }, {
                                text: '列表'
                            }]
                        }
                    }]
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '3. 复选和单选菜单',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            items: [{
                xtype: 'button',
                text: '选项菜单',
                menu: {
                    items: [{
                        text: '显示工具栏',
                        checked: true,
                        checkHandler: function (item, checked) {
                            Ext.Msg.alert('提示', '工具栏' + (checked ? '显示' : '隐藏'));
                        }
                    }, {
                        text: '显示状态栏',
                        checked: true,
                        checkHandler: function (item, checked) {
                            Ext.Msg.alert('提示', '状态栏' + (checked ? '显示' : '隐藏'));
                        }
                    }, '-', {
                        text: '主题',
                        menu: {
                            items: [{
                                text: '经典主题',
                                group: 'theme',
                                checked: true
                            }, {
                                text: '现代主题',
                                group: 'theme'
                            }, {
                                text: '暗黑主题',
                                group: 'theme'
                            }]
                        }
                    }]
                }
            }]
        }]
    }, {
        xtype: 'panel',
        title: '4. 上下文菜单',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            html: '<div style="border: 1px dashed #ccc; padding: 20px; text-align: center;">右键点击此区域显示上下文菜单</div>',
            listeners: {
                render: function (container) {
                    container.getEl().on('contextmenu', function (e) {
                        e.preventDefault();

                        var menu = Ext.create('Ext.menu.Menu', {
                            items: [{
                                text: '查看',
                                iconCls: 'fa-solid fa-eye'
                            }, {
                                text: '编辑',
                                iconCls: 'fa-solid fa-pen'
                            }, {
                                text: '删除',
                                iconCls: 'fa-solid fa-trash-can'
                            }, '-', {
                                text: '属性',
                                iconCls: 'fa-solid fa-circle-info'
                            }]
                        });

                        menu.showAt(e.getXY());
                    });
                }
            }
        }]
    }, {
        xtype: 'panel',
        title: '5. 动态菜单',
        margin: '0 0 10 0',
        items: [{
            xtype: 'container',
            padding: 10,
            items: [{
                xtype: 'button',
                text: '最近打开的文件',
                menu: {
                    listeners: {
                        beforeshow: function (menu) {
                            // 清除旧菜单项
                            menu.removeAll();

                            // 动态添加菜单项
                            menu.add([{
                                text: 'document1.txt',
                                iconCls: 'fa-solid fa-file-lines'
                            }, {
                                text: 'image1.jpg',
                                iconCls: 'fa-solid fa-file-image'
                            }, {
                                text: 'spreadsheet1.xlsx',
                                iconCls: 'fa-solid fa-file-excel'
                            }, '-', {
                                text: '清除最近打开记录',
                                iconCls: 'fa-solid fa-trash-can'
                            }]);
                        }
                    }
                }
            }]
        }]
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Menu</strong>组件提供了丰富的菜单功能:</p>' +
                '<ul>' +
                '<li>基本菜单: 包含图标、分隔符等</li>' +
                '<li>子菜单: 支持多级菜单嵌套</li>' +
                '<li>复选和单选菜单: 支持选项控制</li>' +
                '<li>上下文菜单: 右键菜单功能</li>' +
                '<li>动态菜单: 可以在显示前动态构建菜单项</li>' +
                '</ul>' +
                '<p>菜单组件可以与按钮、面板等其他组件灵活组合使用。</p>' +
                '</div>'
        }]
    }
}); 