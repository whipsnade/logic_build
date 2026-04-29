import { useState } from 'react';
import { 
  Building2, 
  Settings2, 
  BarChart3, 
  BookOpen,
  Clock,
  Play,
  GripVertical,
  Search,
  MousePointer2,
  GitCommit,
  GitBranch,
  Tag,
  AlertTriangle,
  MapPin,
  CalendarDays,
  Target,
  Activity,
  User,
  Plus,
  ChevronRight,
  MoreHorizontal,
  Workflow,
  X,
  Trash2,
  PanelLeft,
  PanelRight
} from 'lucide-react';

const ALL_TICKET_OPTIONS = [
  { id: 't-cat', name: '分类', group: 'ticket', icon: Tag, color: 'text-indigo-500' },
  { id: 't-pri', name: '优先级', group: 'ticket', icon: AlertTriangle, color: 'text-blue-500' },
  { id: 't-chan', name: '来源渠道', group: 'ticket', icon: GitBranch, color: 'text-indigo-500' },
  { id: 't-status', name: '状态', group: 'ticket', icon: Activity, color: 'text-indigo-500' },
  { id: 't-assign', name: '负责人', group: 'ticket', icon: User, color: 'text-indigo-500' },
  { id: 't-dept', name: '部门', group: 'ticket', icon: Building2, color: 'text-indigo-500' },
];

const ALL_ENV_OPTIONS = [
  { id: 'e-region', name: '门店区域 / 距离', group: 'env', icon: MapPin, color: 'text-blue-500' },
  { id: 'e-hours', name: '营业时间模式', group: 'env', icon: Clock, color: 'text-blue-500' },
  { id: 'e-hol', name: '是否法定节假日', group: 'env', icon: CalendarDays, color: 'text-blue-500' },
  { id: 'e-vip', name: 'VIP 客户', group: 'env', icon: User, color: 'text-blue-500' },
  { id: 'e-net', name: '网络连通性', group: 'env', icon: Activity, color: 'text-blue-500' },
];

const ALL_ACTION_OPTIONS = [
  { id: 'a-resp', name: '设置响应目标', actionType: '响应时间', defaultUnit: 'minutes', defaultValue: 15, color: 'rose' },
  { id: 'a-arr', name: '设置到场目标', actionType: '到场时间', defaultUnit: 'hours', defaultValue: 1, color: 'amber' },
  { id: 'a-reso', name: '设置解决目标', actionType: '解决时间', defaultUnit: 'hours', defaultValue: 4, color: 'emerald' },
  { id: 'a-email', name: '发送升级邮件', actionType: '发送升级邮件', defaultUnit: 'N/A', defaultValue: 0, color: 'indigo' },
  { id: 'a-assign', name: '转派专家组', actionType: '转派专家组', defaultUnit: 'N/A', defaultValue: 0, color: 'blue' },
];

const VARIABLE_OPTIONS = [
  { id: 'v1', label: 'P1 - 紧急', colorClass: 'text-rose-700', bgClass: 'bg-rose-50', borderClass: 'border-rose-200' },
  { id: 'v2', label: 'P2 - 高', colorClass: 'text-orange-700', bgClass: 'bg-orange-50', borderClass: 'border-orange-200' },
  { id: 'v3', label: 'P3 - 中', colorClass: 'text-blue-700', bgClass: 'bg-blue-50', borderClass: 'border-blue-200' },
  { id: 'v4', label: 'P4 - 低', colorClass: 'text-slate-700', bgClass: 'bg-slate-50', borderClass: 'border-slate-200' },
  { id: 'v5', label: '硬件 / POS机', colorClass: 'text-slate-700', bgClass: 'bg-slate-50', borderClass: 'border-slate-200' },
  { id: 'v6', label: '软件 / 系统', colorClass: 'text-slate-700', bgClass: 'bg-slate-50', borderClass: 'border-slate-200' },
  { id: 'v7', label: '网络 / 异常', colorClass: 'text-slate-700', bgClass: 'bg-slate-50', borderClass: 'border-slate-200' },
  { id: 'v8', label: '投诉 / 建议', colorClass: 'text-slate-700', bgClass: 'bg-slate-50', borderClass: 'border-slate-200' },
];

interface ConditionNode {
  id: string;
  name: string;
  icon: any;
  iconColor: string;
  operator: string;
  values: { text: string, colorClass: string, bgClass: string, borderClass: string }[];
}

interface ActionNode {
  id: string;
  name: string;
  actionType: string;
  value: number;
  unit: string;
  color: string;
}

export default function App() {
  const [conditions, setConditions] = useState<ConditionNode[]>([
    { 
      id: 'cond-1', 
      name: '分类', 
      icon: Tag, 
      iconColor: 'text-indigo-500', 
      operator: '完全等于', 
      values: [{ text: '硬件 / POS机', colorClass: 'text-white', bgClass: 'bg-slate-800', borderClass: 'border-transparent' }] 
    },
    { 
      id: 'cond-2', 
      name: '优先级', 
      icon: AlertTriangle, 
      iconColor: 'text-blue-500', 
      operator: '在其中包括', 
      values: [
        { text: 'P1 - 紧急', colorClass: 'text-rose-700', bgClass: 'bg-rose-50', borderClass: 'border-rose-200' },
        { text: 'P2 - 高', colorClass: 'text-orange-700', bgClass: 'bg-orange-50', borderClass: 'border-orange-200' }
      ] 
    }
  ]);

  const [actions, setActions] = useState<ActionNode[]>([
    { id: 'act-1', name: '设置响应目标', actionType: '响应时间', value: 15, unit: 'minutes', color: 'rose' },
    { id: 'act-2', name: '设置到场目标', actionType: '到场时间', value: 1, unit: 'hours', color: 'amber' },
    { id: 'act-3', name: '设置解决目标', actionType: '解决时间', value: 4, unit: 'hours', color: 'emerald' },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('cond-2');
  const [isDraggingOverCond, setIsDraggingOverCond] = useState(false);
  const [isDraggingOverAction, setIsDraggingOverAction] = useState(false);

  const [ticketDataIds, setTicketDataIds] = useState<string[]>(['t-cat', 't-pri', 't-chan']);
  const [envDataIds, setEnvDataIds] = useState<string[]>(['e-region', 'e-hours', 'e-hol']);
  const [actionDataIds, setActionDataIds] = useState<string[]>(['a-resp', 'a-arr', 'a-reso']);
  
  const [isToolboxDialogOpen, setIsToolboxDialogOpen] = useState(false);
  const [toolboxDialogType, setToolboxDialogType] = useState<'ticket' | 'env' | 'action'>('ticket');
  const [tempToolboxSelection, setTempToolboxSelection] = useState<string[]>([]);
  
  const ticketData = ALL_TICKET_OPTIONS.filter(opt => ticketDataIds.includes(opt.id));
  const environmentData = ALL_ENV_OPTIONS.filter(opt => envDataIds.includes(opt.id));
  const slaActionsData = ALL_ACTION_OPTIONS.filter(opt => actionDataIds.includes(opt.id));

  const openToolboxDialog = (type: 'ticket' | 'env' | 'action') => {
    setToolboxDialogType(type);
    if (type === 'ticket') setTempToolboxSelection(ticketDataIds);
    if (type === 'env') setTempToolboxSelection(envDataIds);
    if (type === 'action') setTempToolboxSelection(actionDataIds);
    setIsToolboxDialogOpen(true);
  };

  const toolboxWidthMatch: Record<string, { title: string, options: any[] }> = {
    ticket: { title: '工单数据', options: ALL_TICKET_OPTIONS },
    env: { title: '环境', options: ALL_ENV_OPTIONS },
    action: { title: 'SLA 动作', options: ALL_ACTION_OPTIONS }
  };

  const [toolboxWidth, setToolboxWidth] = useState(288);
  const [inspectorWidth, setInspectorWidth] = useState(320);
  const [isToolboxOpen, setIsToolboxOpen] = useState(true);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  const [isVarDialogOpen, setIsVarDialogOpen] = useState(false);
  const [tempSelectedVars, setTempSelectedVars] = useState<string[]>([]);

  const startResizeToolbox = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = toolboxWidth;
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.min(Math.max(startWidth + (moveEvent.pageX - startX), 200), 500);
      setToolboxWidth(newWidth);
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'default';
    };
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const startResizeInspector = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = inspectorWidth;
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.min(Math.max(startWidth - (moveEvent.pageX - startX), 250), 600);
      setInspectorWidth(newWidth);
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'default';
    };
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleDragStart = (e: React.DragEvent, type: string, item: any) => {
    e.dataTransfer.setData('type', type);
    e.dataTransfer.setData('payload', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOverCond = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes('type')) {
      setIsDraggingOverCond(true);
    }
  };

  const handleDragLeaveCond = () => {
    setIsDraggingOverCond(false);
  };

  const handleDropCond = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOverCond(false);
    const type = e.dataTransfer.getData('type');
    if (type === 'condition') {
      const item = JSON.parse(e.dataTransfer.getData('payload'));
      const newCond: ConditionNode = {
        id: `cond-${Date.now()}`,
        name: item.name,
        icon: item.name === '分类' ? Tag : item.name === '优先级' ? AlertTriangle : item.name === '来源渠道' ? GitBranch : item.name === '营业时间模式' ? Clock : item.name === '是否法定节假日' ? CalendarDays : MapPin,
        iconColor: item.color,
        operator: '完全等于',
        values: []
      };
      setConditions([...conditions, newCond]);
      setSelectedNodeId(newCond.id);
    }
  };

  const handleDragOverAction = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.types.includes('type')) {
      setIsDraggingOverAction(true);
    }
  };

  const handleDragLeaveAction = () => {
    setIsDraggingOverAction(false);
  };

  const handleDropAction = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOverAction(false);
    const type = e.dataTransfer.getData('type');
    if (type === 'action') {
      const item = JSON.parse(e.dataTransfer.getData('payload'));
      const newAction: ActionNode = {
        id: `act-${Date.now()}`,
        name: item.name,
        actionType: item.actionType,
        value: item.defaultValue,
        unit: item.defaultUnit,
        color: item.color
      };
      setActions([...actions, newAction]);
    }
  };

  const removeCondition = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConditions(conditions.filter(c => c.id !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const removeAction = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActions(actions.filter(a => a.id !== id));
  };

  const updateAction = (id: string, field: 'value' | 'unit', val: any) => {
    setActions(actions.map(a => a.id === id ? { ...a, [field]: val } : a));
  };

  const selectedCondition = conditions.find(c => c.id === selectedNodeId);

  return (
    <div className="h-screen w-full bg-slate-50 text-slate-900 font-sans flex overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white shadow-xl z-10 clip-path-drawer">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 w-full shadow-sm relative">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border-r border-slate-200 pr-4 mr-2">
               <button 
                 onClick={() => setIsToolboxOpen(!isToolboxOpen)}
                 className={`p-1.5 rounded-lg transition-colors ${isToolboxOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}
                 title="切换参数库"
               >
                 <PanelLeft className="w-5 h-5" />
               </button>
               <button 
                 onClick={() => setIsInspectorOpen(!isInspectorOpen)}
                 className={`p-1.5 rounded-lg transition-colors ${isInspectorOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-100'}`}
                 title="切换属性面板"
               >
                 <PanelRight className="w-5 h-5" />
               </button>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                <span>规则</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-blue-600">可视化流程编辑器</span>
              </div>
              <h1 className="text-lg font-bold text-slate-800 flex items-center gap-3 leading-none">
                硬件事件 SLA（零售）
                <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded text-[10px] uppercase tracking-widest font-bold">生效中</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 mr-4">
              <button className="px-3 py-1.5 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-700 hover:bg-white hover:shadow-sm transition-all focus:outline-none flex-1">表单视图</button>
              <button className="px-3 py-1.5 text-xs font-bold rounded-md bg-white shadow-sm text-blue-700 border border-slate-200 transition-all flex-1">可视化构建器</button>
            </div>
            <button className="px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold shadow-md hover:bg-slate-800 transition-all flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" /> 发布流程
            </button>
          </div>
        </header>

        {/* 3-Pane Visual Builder Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Pane 1: Toolbox (Left) */}
          {isToolboxOpen && (
          <div 
            className="relative flex shrink-0 group/leftpane" 
            style={{ width: `${toolboxWidth}px` }}
          >
            <div className="flex-1 flex flex-col bg-slate-50 border-r border-slate-200 overflow-y-auto overflow-x-hidden w-full">
              <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
              <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">参数库</h2>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="搜索属性..." 
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-slate-50"
                />
              </div>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Ticket Data */}
              <div>
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-indigo-500" /> 工单数据
                </h3>
                <div className="space-y-2">
                  {ticketData.map(item => (
                    <div 
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'condition', item)}
                      className="group flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg cursor-grab active:cursor-grabbing hover:border-indigo-400 hover:shadow-sm transition-all relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-indigo-400" />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{item.name}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => openToolboxDialog('ticket')} className="w-full mt-2 py-2 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 flex items-center justify-center gap-1 transition-colors text-xs font-medium">
                    <Plus className="w-3.5 h-3.5" /> 添加新项
                  </button>
                </div>
              </div>

              {/* Environment Data */}
              <div>
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-blue-500" /> 环境
                </h3>
                <div className="space-y-2">
                  {environmentData.map(item => (
                    <div 
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'condition', item)}
                      className="group flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg cursor-grab active:cursor-grabbing hover:border-blue-400 hover:shadow-sm transition-all relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-blue-400" />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{item.name}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => openToolboxDialog('env')} className="w-full mt-2 py-2 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 flex items-center justify-center gap-1 transition-colors text-xs font-medium">
                    <Plus className="w-3.5 h-3.5" /> 添加新项
                  </button>
                </div>
              </div>

              {/* SLA Actions */}
              <div>
                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-emerald-500" /> SLA 动作（输出）
                </h3>
                <div className="space-y-2">
                  {slaActionsData.map(item => (
                    <div 
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'action', item)}
                      className="group flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 border-dashed rounded-lg cursor-grab active:cursor-grabbing hover:border-emerald-400 hover:shadow-sm transition-all relative overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-emerald-300 group-hover:text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-700">{item.name}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => openToolboxDialog('action')} className="w-full mt-2 py-2 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 flex items-center justify-center gap-1 transition-colors text-xs font-medium">
                    <Plus className="w-3.5 h-3.5" /> 添加新项
                  </button>
                </div>
              </div>

            </div>
            </div>
            <div 
              className="absolute right-0 top-0 w-2.5 h-full cursor-col-resize translate-x-1/2 flex items-center justify-center z-40"
              onMouseDown={startResizeToolbox}
            >
               <div className="w-0.5 h-full bg-transparent group-hover/leftpane:bg-blue-500 transition-colors pointer-events-none"></div>
            </div>
          </div>
          )}

          {/* Pane 2: Visual Canvas (Center) */}
          <div className="flex-1 bg-slate-100 relative overflow-auto shadow-[inset_0px_0px_20px_rgba(0,0,0,0.02)] py-10" 
               style={{ backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            
            <div className="relative w-max min-w-full px-8 mx-auto flex flex-col items-center pb-24">
              
              {/* Context Node (Top) */}
              <div className="bg-white border-2 border-slate-200 rounded-xl px-6 py-4 shadow-sm min-w-[280px] w-auto inline-flex flex-col items-center relative z-10 hover:border-blue-300 transition-colors">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1.5">
                  <Play className="w-3 h-3 fill-slate-400" /> 入口点
                </div>
                <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" /> 工单被创建或更新
                </div>
              </div>

              {/* Connecting Line */}
              <div className="w-0.5 h-10 bg-slate-300 relative z-0"></div>

              {/* IF Condition Block (Main logic group) */}
              <div 
                className="w-fit min-w-[680px] bg-white border-2 border-slate-200 rounded-2xl shadow-md overflow-hidden relative z-10 hover:border-slate-300"
                style={{ resize: 'horizontal' }}
              >
                <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <GitBranch className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-bold text-slate-800">如果 (匹配所有条件)</span>
                  </div>
                  <button className="p-1 hover:bg-slate-200 rounded text-slate-500 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
                
                <div className="p-6 space-y-5 bg-white">
                  
                  {conditions.map((cond, index) => {
                    const isSelected = selectedNodeId === cond.id;
                    const Icon = cond.icon;
                    return (
                      <div key={cond.id} className="relative z-10">
                        {index > 0 && (
                          <div className="flex justify-center -my-2.5 relative z-10 absolute -top-5 left-1/2 -translate-x-1/2">
                            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-md border border-slate-200 shadow-sm">并且</span>
                          </div>
                        )}
                        <div 
                          onClick={() => setSelectedNodeId(cond.id)}
                          className={`bg-white border-2 rounded-xl p-3 flex items-center relative group transition-all cursor-pointer ${
                            isSelected 
                              ? 'border-blue-500 shadow-md ring-4 ring-blue-500/10 transform scale-[1.01]' 
                              : 'border-slate-200 shadow-sm hover:border-indigo-300'
                          }`}
                        >
                          <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 border rounded-full flex items-center justify-center cursor-move shadow-md z-10 ${
                            isSelected ? 'bg-blue-500 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-500'
                          }`}>
                            <GripVertical className="w-3 h-3" />
                          </div>
                          
                          <div className="ml-4 flex-1 flex flex-wrap items-center gap-3 pr-8">
                            <div className="px-2.5 py-1.5 bg-slate-50 text-slate-700 font-semibold text-xs rounded-md border border-slate-200 flex items-center gap-1.5 shadow-sm">
                              <Icon className={`w-3.5 h-3.5 ${cond.iconColor}`} /> {cond.name}
                            </div>
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-blue-500' : 'text-slate-400'}`}>{cond.operator}</span>
                            <div className="flex flex-wrap gap-1.5">
                              {cond.values.length === 0 && (
                                <span className="text-xs text-slate-400 italic">请在右边面板设置</span>
                              )}
                              {cond.values.map((v, i) => (
                                <div key={i} className={`px-3 py-1 font-medium text-xs rounded shadow-sm flex items-center gap-2 border ${v.bgClass} ${v.colorClass} ${v.borderClass}`}>
                                  {v.text} <X className="w-3 h-3 opacity-60 hover:opacity-100 cursor-pointer" />
                                </div>
                              ))}
                            </div>
                          </div>

                          {isSelected && <div className="absolute -right-2 -top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm" />}
                          <button 
                            onClick={(e) => removeCondition(cond.id, e)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {conditions.length > 0 && (
                     <div className="flex justify-center -my-2.5 relative z-10">
                       <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-md border border-slate-200 shadow-sm">并且</span>
                     </div>
                  )}

                  {/* Drop Zone */}
                  <div 
                    onDragOver={handleDragOverCond}
                    onDragLeave={handleDragLeaveCond}
                    onDrop={handleDropCond}
                    className={`border-2 border-dashed rounded-xl p-4 flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer group ${
                      isDraggingOverCond 
                        ? 'border-blue-400 bg-blue-50 text-blue-600' 
                        : 'border-slate-300 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-500'
                    }`}
                  >
                    <Plus className={`w-4 h-4 mr-1 transition-transform ${isDraggingOverCond ? 'scale-125' : 'group-hover:scale-110'}`} /> 
                    {isDraggingOverCond ? '释放添加条件' : '拖拽条件到这里'}
                  </div>
                </div>
              </div>

              {/* Connecting Line DOWN */}
              <div className="w-0.5 h-12 bg-slate-300 relative z-0">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-3 h-3 border border-slate-400 border-l-0 border-t-0 transform rotate-45" />
              </div>

              {/* THEN Actions Block */}
              <div 
                className="w-fit min-w-[680px] bg-white border-2 border-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/5 overflow-hidden relative z-10 ring-4 ring-emerald-500/10 flex flex-col"
                style={{ resize: 'horizontal' }}
              >
                <div className="bg-emerald-50/80 px-5 py-3.5 border-b border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-900">那么 (应用 SLA 目标)</span>
                  </div>
                </div>
                <div className="p-6 flex flex-wrap justify-center gap-5 bg-white">
                  
                  {actions.map(action => (
                    <div key={action.id} className={`w-[260px] shrink-0 bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative group overflow-hidden transition-colors flex flex-col justify-center hover:border-${action.color}-300 hover:shadow-md`}>
                      <div className={`absolute top-0 left-0 w-1.5 h-full bg-${action.color}-400`}></div>
                      <div className="flex justify-between items-start mb-3 pl-3">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">设定目标</div>
                        <div className="flex items-center gap-1">
                          <button className="text-slate-300 hover:text-slate-500"><Settings2 className="w-4 h-4" /></button>
                          <button 
                            onClick={(e) => removeAction(action.id, e)}
                            className="text-slate-300 hover:text-rose-500 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          ><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                      <div className="pl-3 flex flex-col">
                        <span className="text-xs font-semibold text-slate-700 mb-1">{action.actionType} (最长)</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <input 
                            type="number" 
                            value={action.value}
                            onChange={(e) => updateAction(action.id, 'value', Number(e.target.value))}
                            className={`w-16 bg-transparent text-3xl font-black tracking-tighter border-b border-dashed focus:outline-none focus:ring-0 p-0 leading-none text-left text-${action.color}-600 border-${action.color}-300 focus:border-${action.color}-500`} 
                          />
                          <select 
                            value={action.unit}
                            onChange={(e) => updateAction(action.id, 'unit', e.target.value)}
                            className="text-sm font-bold text-slate-500 bg-transparent py-1 pr-4 cursor-pointer focus:outline-none appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:14px_14px] bg-no-repeat bg-[right_center]"
                          >
                            <option value="minutes">分钟</option>
                            <option value="hours">小时</option>
                            <option value="days">天</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div 
                    onDragOver={handleDragOverAction}
                    onDragLeave={handleDragLeaveAction}
                    onDrop={handleDropAction}
                    className={`w-full border-2 border-dashed rounded-xl p-3.5 flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer group ${
                      isDraggingOverAction 
                        ? 'border-emerald-400 bg-emerald-100 text-emerald-700' 
                        : 'border-emerald-200 bg-emerald-50/50 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400'
                    }`}
                  >
                    <Plus className={`w-4 h-4 mr-2 transition-transform ${isDraggingOverAction ? 'scale-125' : 'group-hover:scale-110'}`} /> 
                    {isDraggingOverAction ? '释放添加动作' : '拖拽动作到这里添加'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Pane 3: Inspector / Properties (Right) */}
          {isInspectorOpen && (
          <div 
            className="relative flex shrink-0 group/rightpane"
            style={{ width: `${inspectorWidth}px` }}
          >
            <div 
              className="absolute left-0 top-0 w-2.5 h-full cursor-col-resize -translate-x-1/2 flex items-center justify-center z-40"
              onMouseDown={startResizeInspector}
            >
               <div className="w-0.5 h-full bg-transparent group-hover/rightpane:bg-blue-500 transition-colors pointer-events-none"></div>
            </div>
            <div className="bg-white border-l border-slate-200 flex flex-col flex-1 shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.05)] z-20 overflow-hidden w-full">
            {selectedCondition ? (
              <>
                <div className="p-5 border-b border-slate-200 bg-slate-50">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Settings2 className="w-3.5 h-3.5" /> 节点设置
                  </div>
                  <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    {selectedCondition.icon && <selectedCondition.icon className={`w-5 h-5 ${selectedCondition.iconColor}`} />}
                    {selectedCondition.name}
                  </h2>
                </div>
                
                <div className="p-6 flex-1 overflow-y-auto space-y-7 bg-white">
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">逻辑运算符</label>
                    <div className="relative">
                      <select 
                        value={selectedCondition.operator}
                        onChange={(e) => {
                          setConditions(conditions.map(c => 
                            c.id === selectedCondition.id ? { ...c, operator: e.target.value } : c
                          ));
                        }}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg p-3 pr-8 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold text-slate-800 shadow-sm cursor-pointer"
                      >
                        <option value="在其中包括">在其中包括 (任意)</option>
                        <option value="完全等于">完全等于</option>
                        <option value="不等于">不等于 (排除)</option>
                      </select>
                      <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">目标值</label>
                      <span 
                        className="text-[10px] text-blue-600 font-bold hover:text-blue-800 cursor-pointer"
                        onClick={() => {
                          setTempSelectedVars(selectedCondition.values.map(v => v.text));
                          setIsVarDialogOpen(true);
                        }}
                      >
                        添加变量 {`{x}`}
                      </span>
                    </div>
                    
                    <div className="space-y-2 border border-slate-200 rounded-xl p-2 bg-slate-50 shadow-inner">
                      {selectedCondition.values.map((v, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg text-sm shadow-sm cursor-grab active:cursor-grabbing hover:border-slate-300 group">
                          <div className="flex items-center gap-2">
                            <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-400" />
                            <span className={`font-bold ${v.colorClass}`}>{v.text}</span>
                          </div>
                          <button 
                            className="text-slate-400 hover:text-rose-500"
                            onClick={() => {
                              const newVals = [...selectedCondition.values];
                              newVals.splice(idx, 1);
                              setConditions(conditions.map(c => 
                                c.id === selectedCondition.id ? { ...c, values: newVals } : c
                              ));
                            }}
                          ><X className="w-4 h-4" /></button>
                        </div>
                      ))}
                      
                      <div className="relative mt-2 flex items-center">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                        <input 
                          type="text" 
                          placeholder="敲击回车添加值..." 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                              const newVals = [...selectedCondition.values, { text: e.currentTarget.value, colorClass: 'text-slate-700', bgClass: 'bg-white', borderClass: 'border-slate-200' }];
                              setConditions(conditions.map(c => 
                                c.id === selectedCondition.id ? { ...c, values: newVals } : c
                              ));
                              e.currentTarget.value = '';
                            }
                          }}
                          className="w-full text-sm py-2.5 pl-9 pr-3 bg-transparent border-none focus:ring-0 placeholder:text-slate-400 text-slate-700 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-200" />

                  <div className="space-y-4 pt-1">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">节点行为选项</h3>
                    
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center pt-0.5">
                        <input type="checkbox" className="peer sr-only" defaultChecked />
                        <div className="w-4 h-4 rounded-sm border border-slate-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors shadow-sm"></div>
                        <svg className="absolute left-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 16 16" fill="none">
                          <path d="M4 8l2.5 2.5L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">7x24小时适用 (忽略日历)</div>
                        <div className="text-[11px] text-slate-500 leading-snug mt-1">如果启用，SLA 计时器将在非工作时间及节假日继续计时。</div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center pt-0.5">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="w-4 h-4 rounded-sm border border-slate-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors shadow-sm"></div>
                        <svg className="absolute left-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 16 16" fill="none">
                          <path d="M4 8l2.5 2.5L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">需要绝对匹配</div>
                        <div className="text-[11px] text-slate-500 leading-snug mt-1">检查必须完全通过，防止子优先级的模糊匹配。</div>
                      </div>
                    </label>
                  </div>

                </div>
                
                <div className="p-5 border-t border-slate-200 bg-white flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                  <button className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-sm rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors">放弃修改</button>
                  <button className="flex-1 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg shadow-md hover:bg-blue-500 transition-colors">保存详情</button>
                </div>
              </>
            ) : (
              <div className="p-10 flex flex-col items-center justify-center text-center h-full text-slate-400">
                <MousePointer2 className="w-10 h-10 mb-4 opacity-50 stroke-1" />
                <p className="text-sm font-medium text-slate-500">在中间画布中选择一个节点<br/>来查看和编辑其属性</p>
              </div>
            )}
            </div>
          </div>
          )}

        </div>
      </main>

      {/* Toolbox Items Selection Dialog */}
      {isToolboxDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">
                向 {toolboxWidthMatch[toolboxDialogType].title} 添加新项
              </h3>
              <button 
                onClick={() => setIsToolboxDialogOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] bg-slate-50 flex-1">
              <div className="grid grid-cols-2 gap-3">
                {toolboxWidthMatch[toolboxDialogType].options.map((opt: any) => {
                  const isSelected = tempToolboxSelection.includes(opt.id);
                  const Icon = opt.icon;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => {
                        if (isSelected) {
                          setTempToolboxSelection(tempToolboxSelection.filter(id => id !== opt.id));
                        } else {
                          setTempToolboxSelection([...tempToolboxSelection, opt.id]);
                        }
                      }}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-sm' 
                          : 'border-slate-200 hover:border-blue-300 hover:bg-white bg-white shadow-sm'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l2.5 2.5L12 5" /></svg>}
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        {Icon && <Icon className={`w-4 h-4 ${opt.color || 'text-slate-500'}`} />}
                        <div className={`text-sm font-bold ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                          {opt.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between items-center">
              <div className="text-sm text-slate-500">
                已选择 <span className="font-bold text-blue-600">{tempToolboxSelection.length}</span> 项
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsToolboxDialogOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    if (toolboxDialogType === 'ticket') setTicketDataIds(tempToolboxSelection);
                    if (toolboxDialogType === 'env') setEnvDataIds(tempToolboxSelection);
                    if (toolboxDialogType === 'action') setActionDataIds(tempToolboxSelection);
                    setIsToolboxDialogOpen(false);
                  }}
                  className="px-5 py-2 rounded-lg text-sm font-bold bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-colors"
                >
                  确认添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variable Selection Dialog */}
      {isVarDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">选择目标值变量</h3>
              <button 
                onClick={() => setIsVarDialogOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] bg-slate-50 flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {VARIABLE_OPTIONS.map(opt => {
                  const isSelected = tempSelectedVars.includes(opt.label);
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => {
                        if (isSelected) {
                          setTempSelectedVars(tempSelectedVars.filter(v => v !== opt.label));
                        } else {
                          setTempSelectedVars([...tempSelectedVars, opt.label]);
                        }
                      }}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-sm' 
                          : 'border-slate-200 hover:border-blue-300 hover:bg-white bg-white shadow-sm'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l2.5 2.5L12 5" /></svg>}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-bold ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                          {opt.label}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{opt.id}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between items-center">
              <div className="text-sm text-slate-500">
                已选择 <span className="font-bold text-blue-600">{tempSelectedVars.length}</span> 个变量
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsVarDialogOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    if (selectedCondition) {
                      const newValues = tempSelectedVars.map(valStr => {
                        const matchedOpt = VARIABLE_OPTIONS.find(o => o.label === valStr);
                        if (matchedOpt) {
                          return { text: matchedOpt.label, colorClass: matchedOpt.colorClass, bgClass: matchedOpt.bgClass, borderClass: matchedOpt.borderClass };
                        }
                        return { text: valStr, colorClass: 'text-slate-700', bgClass: 'bg-white', borderClass: 'border-slate-200' };
                      });
                      
                      setConditions(conditions.map(c => 
                        c.id === selectedCondition.id ? { ...c, values: newValues } : c
                      ));
                    }
                    setIsVarDialogOpen(false);
                  }}
                  className="px-5 py-2 rounded-lg text-sm font-bold bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-colors"
                >
                  确认添加
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
