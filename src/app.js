// 创建主应用界面
Ext.onReady(function () {
    // 定义demo数据模型
    Ext.define('Demo', {
        extend: 'Ext.data.Model',
        fields: ['id', 'text', 'leaf', 'className']
    });

    // 创建demo导航树的数据
    var demoStore = Ext.create('Ext.data.TreeStore', {
        model: 'Demo',
        root: {
            expanded: true,
            children: [{
                text: '1. 基础布局组件',
                expanded: true,
                children: [{
                    id: 'panel-demo',
                    text: 'Panel 面板',
                    leaf: true,
                    className: 'PanelDemo'
                }, {
                    id: 'container-demo',
                    text: 'Container 容器',
                    leaf: true,
                    className: 'ContainerDemo'
                }, {
                    id: 'layout-demo',
                    text: 'Layouts 布局',
                    leaf: true,
                    className: 'LayoutDemo'
                }]
            }, {
                text: '2. 表单组件',
                expanded: true,
                children: [{
                    id: 'form-demo',
                    text: 'Form 表单',
                    leaf: true,
                    className: 'FormDemo'
                }, {
                    id: 'field-demo',
                    text: 'Fields 字段',
                    leaf: true,
                    className: 'FieldDemo'
                }, {
                    id: 'validation-demo',
                    text: '表单验证',
                    leaf: true,
                    className: 'ValidationDemo'
                }]
            }, {
                text: '3. 数据组件',
                expanded: true,
                children: [{
                    id: 'data-demo',
                    text: 'Store & Model',
                    leaf: true,
                    className: 'DataDemo'
                }, {
                    id: 'proxy-demo',
                    text: 'Proxy & Reader',
                    leaf: true,
                    className: 'ProxyDemo'
                }, {
                    id: 'grid-demo',
                    text: 'Grid 表格',
                    leaf: true,
                    className: 'GridDemo'
                }]
            }, {
                text: '4. 工具栏和菜单',
                expanded: true,
                children: [{
                    id: 'toolbar-demo',
                    text: 'Toolbar 工具栏',
                    leaf: true,
                    className: 'ToolbarDemo'
                }, {
                    id: 'menu-demo',
                    text: 'Menu 菜单',
                    leaf: true,
                    className: 'MenuDemo'
                }, {
                    id: 'button-demo',
                    text: 'Button 按钮',
                    leaf: true,
                    className: 'ButtonDemo'
                }]
            }, {
                text: '5. 窗口和对话框',
                expanded: true,
                children: [{
                    id: 'window-demo',
                    text: 'Window 窗口',
                    leaf: true,
                    className: 'WindowDemo'
                }, {
                    id: 'messagebox-demo',
                    text: 'MessageBox 消息框',
                    leaf: true,
                    className: 'MessageBoxDemo'
                }, {
                    id: 'tooltip-demo',
                    text: 'Tooltip 提示',
                    leaf: true,
                    className: 'TooltipDemo'
                }]
            }, {
                text: '6. 树和列表',
                expanded: true,
                children: [{
                    id: 'tree-demo',
                    text: 'Tree 树',
                    leaf: true,
                    className: 'TreeDemo'
                }, {
                    id: 'list-demo',
                    text: 'List 列表',
                    leaf: true,
                    className: 'ListDemo'
                }]
            }, {
                text: '7. 特殊组件',
                expanded: true,
                children: [{
                    id: 'drag-drop-demo',
                    text: '拖放功能',
                    leaf: true,
                    className: 'DragDropDemo'
                }, {
                    id: 'chart-demo',
                    text: '图表组件',
                    leaf: true,
                    className: 'ChartDemo'
                }]
            }, {
                text: '8. 工具类',
                expanded: true,
                children: [{
                    id: 'util-demo',
                    text: '常用工具类',
                    leaf: true,
                    className: 'UtilDemo'
                }, {
                    id: 'ajax-demo',
                    text: 'Ajax请求',
                    leaf: true,
                    className: 'AjaxDemo'
                }]
            }]
        }
    });

    // 创建主视图
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        items: [{
            region: 'north',
            xtype: 'panel',
            height: 50,
            bodyStyle: {
                background: '#157fcc',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '10px'
            },
            html: 'ExtJS Components Demo'
        }, {
            region: 'west',
            xtype: 'treepanel',
            title: 'Demo导航',
            width: 250,
            split: true,
            collapsible: true,
            store: demoStore,
            listeners: {
                itemclick: function (view, record) {
                    if (record.get('leaf')) {
                        var contentPanel = Ext.getCmp('content-panel');
                        var className = record.get('className');

                        // 清除现有内容
                        contentPanel.removeAll();

                        // 加载新的demo组件
                        try {
                            console.log('正在加载组件:', className);
                            console.log('完整类名:', 'Demo.' + className);
                            var demoComponent = Ext.create('Demo.' + className);
                            console.log('组件创建成功:', demoComponent);
                            contentPanel.add(demoComponent);
                        } catch (e) {
                            console.error('加载组件失败:', {
                                className: className,
                                error: e,
                                message: e.message,
                                stack: e.stack
                            });
                            contentPanel.add({
                                xtype: 'panel',
                                html: '<div class="demo-description">' +
                                    '<h2>组件加载失败</h2>' +
                                    '<p>加载组件时发生错误。</p>' +
                                    '<p><strong>组件名称:</strong> ' + className + '</p>' +
                                    '<p><strong>错误信息:</strong> ' + e.message + '</p>' +
                                    '<p><strong>错误堆栈:</strong></p>' +
                                    '<pre>' + e.stack + '</pre>' +
                                    '</div>'
                            });
                        }
                    }
                }
            }
        }, {
            region: 'center',
            xtype: 'panel',
            id: 'content-panel',
            title: '演示区域',
            layout: 'fit',
            bodyPadding: 10,
            items: [{
                xtype: 'panel',
                html: '<div class="demo-description">' +
                    '<h2>欢迎使用ExtJS组件演示!</h2>' +
                    '<p>这个演示项目展示了ExtJS中常用组件的用法。</p>' +
                    '<p>请从左侧选择要查看的组件demo。每个demo都包含了:</p>' +
                    '<ul>' +
                    '<li>实际运行的示例</li>' +
                    '<li>相关代码说明</li>' +
                    '<li>常见使用场景</li>' +
                    '<li>最佳实践提示</li>' +
                    '</ul>' +
                    '</div>'
            }]
        }, {
            region: 'south',
            xtype: 'panel',
            height: 30,
            bodyStyle: {
                padding: '5px'
            },
            html: '© 2024 ExtJS Components Demo'
        }]
    });
}); 