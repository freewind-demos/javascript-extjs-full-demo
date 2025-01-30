Ext.define('Demo.ToolbarDemo', {
    extend: 'Ext.panel.Panel',

    title: 'Toolbar & Menu 演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,

    initComponent: function () {
        var me = this;

        // 创建一个简单的store用于分页工具栏演示
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            pageSize: 5,
            data: [
                { id: 1, name: '数据项 1' },
                { id: 2, name: '数据项 2' },
                { id: 3, name: '数据项 3' },
                { id: 4, name: '数据项 4' },
                { id: 5, name: '数据项 5' },
                { id: 6, name: '数据项 6' },
                { id: 7, name: '数据项 7' },
                { id: 8, name: '数据项 8' },
                { id: 9, name: '数据项 9' },
                { id: 10, name: '数据项 10' }
            ],
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        });

        // 扩展配置
        Ext.apply(me, {
            items: [{
                xtype: 'panel',
                title: '1. 基本工具栏',
                margin: '0 0 10 0',
                tbar: [{
                    text: '新建',
                    iconCls: 'x-fa fa-plus',
                    handler: function () {
                        Ext.Msg.alert('提示', '点击了新建按钮');
                    }
                }, {
                    text: '编辑',
                    iconCls: 'x-fa fa-edit',
                    handler: function () {
                        Ext.Msg.alert('提示', '点击了编辑按钮');
                    }
                }, {
                    text: '删除',
                    iconCls: 'x-fa fa-minus',
                    handler: function () {
                        Ext.Msg.alert('提示', '点击了删除按钮');
                    }
                }, '->', {
                    xtype: 'textfield',
                    emptyText: '搜索...',
                    width: 200
                }, {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search'
                }],
                html: '<div style="padding:10px">工具栏示例</div>'
            }, {
                xtype: 'panel',
                title: '2. 分页工具栏',
                margin: '0 0 10 0',
                layout: 'fit',
                height: 200,
                items: [{
                    xtype: 'grid',
                    store: store,
                    columns: [{
                        text: 'ID',
                        dataIndex: 'id',
                        width: 100
                    }, {
                        text: '名称',
                        dataIndex: 'name',
                        flex: 1
                    }],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        store: store,
                        displayInfo: true
                    }
                }]
            }, {
                xtype: 'panel',
                title: '3. 菜单按钮',
                margin: '0 0 10 0',
                tbar: [{
                    text: '文件',
                    menu: {
                        items: [{
                            text: '新建文件',
                            iconCls: 'x-fa fa-file'
                        }, {
                            text: '打开文件',
                            iconCls: 'x-fa fa-folder-open'
                        }, '-', {
                            text: '保存',
                            iconCls: 'x-fa fa-save'
                        }]
                    }
                }, {
                    text: '编辑',
                    menu: {
                        items: [{
                            text: '剪切',
                            iconCls: 'x-fa fa-cut'
                        }, {
                            text: '复制',
                            iconCls: 'x-fa fa-copy'
                        }, {
                            text: '粘贴',
                            iconCls: 'x-fa fa-paste'
                        }]
                    }
                }, {
                    text: '视图',
                    menu: {
                        items: [{
                            text: '放大',
                            iconCls: 'x-fa fa-search-plus'
                        }, {
                            text: '缩小',
                            iconCls: 'x-fa fa-search-minus'
                        }, '-', {
                            text: '实际大小',
                            iconCls: 'x-fa fa-compress'
                        }]
                    }
                }],
                html: '<div style="padding:10px">菜单按钮示例</div>'
            }, {
                xtype: 'panel',
                title: '4. 上下文菜单',
                margin: '0 0 10 0',
                html: '<div style="padding:10px">右键点击此区域查看上下文菜单</div>',
                listeners: {
                    render: function (p) {
                        p.getEl().on('contextmenu', function (e) {
                            e.preventDefault();

                            Ext.create('Ext.menu.Menu', {
                                items: [{
                                    text: '查看',
                                    iconCls: 'x-fa fa-eye'
                                }, {
                                    text: '编辑',
                                    iconCls: 'x-fa fa-edit'
                                }, '-', {
                                    text: '删除',
                                    iconCls: 'x-fa fa-trash'
                                }]
                            }).showAt(e.getXY());
                        });
                    }
                }
            }, {
                xtype: 'panel',
                title: '5. 工具栏溢出处理',
                margin: '0 0 10 0',
                width: '100%',
                tbar: {
                    enableOverflow: true,
                    items: (function () {
                        var items = [];
                        for (var i = 1; i <= 20; i++) {
                            items.push({
                                text: '按钮 ' + i,
                                handler: function () {
                                    Ext.Msg.alert('提示', '点击了: ' + this.text);
                                }
                            });
                        }
                        return items;
                    })()
                },
                html: '<div style="padding:10px">当工具栏按钮过多时,会自动显示溢出菜单</div>'
            }]
        });

        me.callParent();

        // 加载store数据
        store.load();
    },

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>Toolbar</strong>和<strong>Menu</strong>组件提供了丰富的功能:</p>' +
                '<ul>' +
                '<li>基本工具栏: 按钮、文本框等的组合</li>' +
                '<li>分页工具栏: 用于数据分页</li>' +
                '<li>菜单按钮: 下拉菜单功能</li>' +
                '<li>上下文菜单: 右键菜单</li>' +
                '<li>溢出处理: 自动处理工具栏项溢出</li>' +
                '</ul>' +
                '<p>这些组件通常用于构建应用程序的导航和操作界面。</p>' +
                '</div>'
        }]
    }
}); 