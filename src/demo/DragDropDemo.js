Ext.define('Demo.DragDropDemo', {
    extend: 'Ext.panel.Panel',

    title: 'DragDrop 拖放功能演示',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 10,
    autoScroll: true,
    minHeight: 600,
    maxHeight: 800,

    // 添加自定义样式
    initComponent: function () {
        console.log('DragDropDemo - initComponent start');

        // 添加必要的样式
        var styleSheet = `
            .drag-source { border: 1px solid #ccc; padding: 10px; margin: 5px; cursor: move; background: #fff; }
            .drag-proxy { border: 1px dashed #157fcc; background: #f5f5f5; padding: 5px; }
            .drop-target-valid { border: 2px dashed #157fcc !important; }
            .drop-target-invalid { border: 2px dashed #ff0000 !important; }
            .draggable-item { border: 1px solid #ccc; padding: 10px; margin: 5px; cursor: move; background: #fff; }
            .task-item { border: 1px solid #ccc; padding: 10px; margin: 5px; cursor: move; background: #fff; }
            .task-proxy { border: 1px dashed #157fcc; background: #f5f5f5; padding: 5px; }
            .task-target-valid { background-color: #e8f5e9; }
            .task-target-invalid { background-color: #ffebee; }
            .file-drop-zone { border: 3px dashed #ccc; padding: 20px; text-align: center; background: #fff; }
            .file-drop-hover { border-color: #157fcc; background: #f5f5f5; }
            .product-item { border: 1px solid #ccc; padding: 10px; margin: 5px; cursor: move; background: #fff; }
            .product-proxy { border: 1px dashed #157fcc; background: #f5f5f5; padding: 5px; }
            .cart-item { border: 1px solid #ccc; padding: 10px; margin: 5px; background: #fff; }
            .task-list { min-height: 100px; }
        `;
        console.log('DragDropDemo - Creating stylesheet:', styleSheet);
        Ext.util.CSS.createStyleSheet(styleSheet);

        this.on('afterrender', function () {
            console.log('DragDropDemo - afterrender');
            console.log('Panel dimensions:', {
                width: this.getWidth(),
                height: this.getHeight(),
                bodyWidth: this.body.getWidth(),
                bodyHeight: this.body.getHeight()
            });
        });

        this.callParent();
        console.log('DragDropDemo - initComponent end');
    },

    defaults: {
        xtype: 'panel',
        margin: '0 0 10 0',
        frame: true,
        minHeight: 200,
        listeners: {
            afterrender: function (panel) {
                console.log('Panel afterrender:', panel.title, {
                    width: panel.getWidth(),
                    height: panel.getHeight()
                });
            }
        }
    },

    items: [{
        title: '1. 基本拖放',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        height: 250,
        items: [{
            xtype: 'panel',
            title: '源面板',
            width: 200,
            margin: '0 10 0 0',
            bodyPadding: 10,
            html: '<div class="drag-source">拖动我</div>' +
                '<div class="drag-source">也可以拖动我</div>',
            listeners: {
                afterrender: function (p) {
                    console.log('Source panel afterrender');
                    // 等待面板完全渲染
                    Ext.defer(function () {
                        var dragSources = p.body.query('.drag-source');
                        console.log('Found drag sources:', dragSources.length);

                        Ext.Array.each(dragSources, function (el) {
                            var dragSource = new Ext.drag.Source({
                                element: el,
                                groups: ['basicGroup'],
                                proxy: {
                                    type: 'placeholder',
                                    cls: 'drag-proxy',
                                    html: '{text}',
                                    cursorOffset: [20, 20]
                                },
                                listeners: {
                                    beforedragstart: function (source, info) {
                                        console.log('Drag start:', info);
                                        source.getProxy().setHtml(info.eventTarget.innerHTML);
                                        return true;
                                    },
                                    dragmove: function (source, info) {
                                        console.log('Drag move:', info.proxy.current.x, info.proxy.current.y);
                                    }
                                }
                            });
                            console.log('Created drag source:', dragSource);
                        });
                    }, 100);
                }
            }
        }, {
            xtype: 'panel',
            title: '目标面板',
            flex: 1,
            bodyPadding: 10,
            html: '<div class="drop-target" style="border: 2px dashed #ccc; padding: 20px; text-align: center; min-height: 150px;">放置区域</div>',
            listeners: {
                afterrender: function (p) {
                    console.log('Target panel afterrender');
                    // 等待面板完全渲染
                    Ext.defer(function () {
                        var dropTarget = new Ext.drag.Target({
                            element: p.body.down('.drop-target'),
                            groups: ['basicGroup'],
                            validCls: 'drop-target-valid',
                            invalidCls: 'drop-target-invalid',
                            listeners: {
                                dragenter: function (target, info) {
                                    console.log('Drag enter');
                                },
                                dragleave: function (target, info) {
                                    console.log('Drag leave');
                                },
                                drop: function (target, info) {
                                    console.log('Drop:', info);
                                    var draggedElement = info.eventTarget;
                                    var clone = draggedElement.cloneNode(true);
                                    target.getElement().appendChild(clone);
                                }
                            }
                        });
                        console.log('Created drop target:', dropTarget);
                    }, 100);
                }
            }
        }]
    }, {
        title: '2. 列表排序',
        height: 300,
        layout: 'fit',
        items: [{
            xtype: 'dataview',
            store: {
                fields: ['id', 'name', 'description'],
                data: [{
                    id: 1,
                    name: '项目1',
                    description: '这是项目1的描述'
                }, {
                    id: 2,
                    name: '项目2',
                    description: '这是项目2的描述'
                }, {
                    id: 3,
                    name: '项目3',
                    description: '这是项目3的描述'
                }, {
                    id: 4,
                    name: '项目4',
                    description: '这是项目4的描述'
                }]
            },
            itemTpl: '<div class="draggable-item">' +
                '<div class="item-name">{name}</div>' +
                '<div class="item-description">{description}</div>' +
                '</div>',
            itemSelector: '.draggable-item',
            plugins: {
                ptype: 'gridviewdragdrop',
                dragText: '移动项目到新位置'
            }
        }]
    }, {
        title: '3. 分组拖放',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        height: 300,
        defaults: {
            xtype: 'panel',
            flex: 1,
            margin: '0 5',
            bodyPadding: 10,
            autoScroll: true,
            frame: true
        },
        items: [{
            title: '待处理',
            itemId: 'todo',
            html: '<div class="task-list">' +
                '<div class="task-item">任务1</div>' +
                '<div class="task-item">任务2</div>' +
                '<div class="task-item">任务3</div>' +
                '</div>'
        }, {
            title: '进行中',
            itemId: 'inProgress',
            html: '<div class="task-list"></div>'
        }, {
            title: '已完成',
            itemId: 'done',
            html: '<div class="task-list"></div>'
        }],
        listeners: {
            render: function (panel) {
                panel.items.each(function (item) {
                    // 等待下一帧再创建拖放源，确保DOM已完全渲染
                    Ext.defer(function () {
                        var taskItems = item.body.query('.task-item');
                        Ext.Array.each(taskItems, function (el) {
                            new Ext.drag.Source({
                                element: el,
                                proxy: {
                                    type: 'placeholder',
                                    cls: 'task-proxy',
                                    html: '{text}',
                                    cursorOffset: [20, 20]
                                },
                                listeners: {
                                    beforedragstart: function (source, info) {
                                        source.getProxy().setHtml(info.eventTarget.innerHTML);
                                        return true;
                                    }
                                }
                            });
                        });

                        new Ext.drag.Target({
                            element: item.body.down('.task-list'),
                            validCls: 'task-target-valid',
                            invalidCls: 'task-target-invalid',
                            listeners: {
                                drop: function (target, info) {
                                    var draggedElement = info.eventTarget;
                                    var taskList = item.body.down('.task-list');
                                    if (draggedElement.parentNode !== taskList) {
                                        taskList.appendChild(draggedElement.cloneNode(true));
                                        draggedElement.parentNode.removeChild(draggedElement);
                                    }
                                }
                            }
                        });
                    }, 100);
                });
            }
        }
    }, {
        title: '4. 文件上传模拟',
        height: 200,
        bodyPadding: 10,
        html: '<div class="file-drop-zone" style="height: 120px;">拖放文件到此处上传</div>',
        listeners: {
            render: function (p) {
                var el = p.body.down('.file-drop-zone');

                el.dom.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    el.addCls('file-drop-hover');
                });

                el.dom.addEventListener('dragleave', function (e) {
                    e.preventDefault();
                    el.removeCls('file-drop-hover');
                });

                el.dom.addEventListener('drop', function (e) {
                    e.preventDefault();
                    el.removeCls('file-drop-hover');

                    var files = e.dataTransfer.files;
                    var fileNames = [];
                    for (var i = 0; i < files.length; i++) {
                        fileNames.push(files[i].name);
                    }

                    if (fileNames.length > 0) {
                        Ext.Msg.alert('文件上传', '模拟上传文件：' + fileNames.join(', '));
                    }
                });
            }
        }
    }, {
        title: '5. 购物车模拟',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        height: 300,
        items: [{
            xtype: 'panel',
            title: '商品列表',
            width: 300,
            margin: '0 10 0 0',
            bodyPadding: 10,
            frame: true,
            html: '<div class="product-list">' +
                '<div class="product-item" data-price="99.00">商品1 - ￥99.00</div>' +
                '<div class="product-item" data-price="199.00">商品2 - ￥199.00</div>' +
                '<div class="product-item" data-price="299.00">商品3 - ￥299.00</div>' +
                '</div>'
        }, {
            xtype: 'panel',
            title: '购物车',
            flex: 1,
            frame: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                flex: 1,
                bodyPadding: 10,
                html: '<div class="cart-list" style="min-height: 200px; border: 2px dashed #ccc;"></div>'
            }, {
                xtype: 'toolbar',
                items: [{
                    xtype: 'component',
                    html: '总计：',
                    margin: '0 10 0 0'
                }, {
                    xtype: 'component',
                    itemId: 'totalPrice',
                    html: '￥0.00'
                }]
            }]
        }],
        listeners: {
            render: function (panel) {
                var productList = panel.down('[title=商品列表]');
                var cartList = panel.down('.cart-list');
                var totalPrice = panel.down('#totalPrice');

                Ext.defer(function () {
                    var productItems = productList.body.query('.product-item');
                    Ext.Array.each(productItems, function (el) {
                        new Ext.drag.Source({
                            element: el,
                            proxy: {
                                type: 'placeholder',
                                cls: 'product-proxy',
                                html: '{text}',
                                cursorOffset: [20, 20]
                            },
                            listeners: {
                                beforedragstart: function (source, info) {
                                    source.getProxy().setHtml(info.eventTarget.innerHTML);
                                    return true;
                                }
                            }
                        });
                    });

                    new Ext.drag.Target({
                        element: cartList,
                        validCls: 'drop-target-valid',
                        invalidCls: 'drop-target-invalid',
                        listeners: {
                            drop: function (target, info) {
                                var draggedElement = info.eventTarget;
                                var price = parseFloat(draggedElement.getAttribute('data-price'));
                                var clone = draggedElement.cloneNode(true);
                                clone.className = 'cart-item';
                                cartList.appendChild(clone);

                                var currentTotal = parseFloat(totalPrice.getEl().dom.innerText.replace('￥', ''));
                                totalPrice.setHtml('￥' + (currentTotal + price).toFixed(2));
                            }
                        }
                    });
                }, 100);
            }
        }
    }],

    // 底部说明
    bbar: {
        xtype: 'toolbar',
        items: [{
            xtype: 'component',
            html: '<div class="demo-description">' +
                '<p><strong>DragDrop</strong>组件提供了丰富的拖放功能:</p>' +
                '<ul>' +
                '<li>基本拖放: 简单的拖放操作</li>' +
                '<li>列表排序: 通过拖放重新排序</li>' +
                '<li>分组拖放: 在不同分组间移动项目</li>' +
                '<li>文件上传: 模拟文件拖放上传</li>' +
                '<li>购物车: 模拟商品添加到购物车</li>' +
                '</ul>' +
                '<p>拖放功能可用于构建交互性强的用户界面。</p>' +
                '</div>'
        }]
    }
}); 
