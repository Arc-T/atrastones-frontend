import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, X, Badge } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { isRTL } from '@/utils/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

export default function DataTable({
    columns = [],
    data = [],
    isLoading = false,
    filters = [],
    onRowClick,
    actions,
    searchable = true,
    pageSize: defaultPageSize = 10,
    emptyIcon
}) {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [sortConfig, setSortConfig] = useState({ key: null, dir: 'asc' });
    const [activeFilters, setActiveFilters] = useState({});
    const [showFilters, setShowFilters] = useState(false);

    const filteredData = useMemo(() => {
        let result = [...data];

        if (search) {
            const lower = search.toLowerCase();
            result = result.filter(row =>
                columns.some(col => {
                    const val = col.accessorKey ? row[col.accessorKey] : '';
                    return String(val).toLowerCase().includes(lower);
                })
            );
        }

        Object.entries(activeFilters).forEach(([key, val]) => {
            if (val && val !== 'all') {
                result = result.filter(row => String(row[key]) === val);
            }
        });

        if (sortConfig.key) {
            result.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal < bVal) return sortConfig.dir === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.dir === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, search, activeFilters, sortConfig, columns]);

    const paginatedData = filteredData.slice(page * pageSize, (page + 1) * pageSize);
    const totalPages = Math.ceil(filteredData.length / pageSize);

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc'
        }));
    };

    const activeFilterCount = Object.values(activeFilters).filter(v => v && v !== 'all').length;

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
                {searchable && (
                    <div className="relative flex-1 min-w-50 max-w-sm">
                        <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isRTL() ? 'right-3' : 'left-3'}`} />
                        <Input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                            placeholder={t('search')}
                            className={`${isRTL() ? 'pr-9' : 'pl-9'} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700`}
                        />
                    </div>
                )}

                {filters.length > 0 && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className="gap-2 relative"
                    >
                        <Filter className="w-4 h-4" />
                        {t('filter')}
                        {activeFilterCount > 0 && (
                            <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-indigo-600 text-white text-xs rounded-full">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </Button>
                )}

                {actions}
            </div>

            {showFilters && filters.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                    {filters.map(filter => (
                        <Select
                            key={filter.key}
                            value={activeFilters[filter.key] || 'all'}
                            onValueChange={(val) => {
                                setActiveFilters(prev => ({ ...prev, [filter.key]: val }));
                                setPage(0);
                            }}
                        >
                            <SelectTrigger className="w-40 bg-white dark:bg-slate-900">
                                <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('all')} {filter.label}</SelectItem>
                                {filter.options.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}
                    {activeFilterCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={() => setActiveFilters({})} className="text-red-500 hover:text-red-600 gap-1">
                            <X className="w-3 h-3" /> {t('clear')}
                        </Button>
                    )}
                </div>
            )}

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/80 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-200 dark:border-slate-700">
                                {columns.map(col => (
                                    <TableHead
                                        key={col.accessorKey || col.id}
                                        onClick={() => col.accessorKey && handleSort(col.accessorKey)}
                                        className={`text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap ${col.accessorKey ? 'cursor-pointer select-none hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors' : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-1">
                                            {col.header}
                                            {col.accessorKey && (
                                                sortConfig.key === col.accessorKey
                                                    ? (sortConfig.dir === 'asc'
                                                        ? <ArrowUp className="w-3 h-3 text-indigo-500" />
                                                        : <ArrowDown className="w-3 h-3 text-indigo-500" />)
                                                    : <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <TableRow key={i} className="border-b border-slate-50 dark:border-slate-800/50">
                                        {columns.map((col, j) => (
                                            <TableCell key={j}><Skeleton className="h-4 w-full max-w-30 rounded-lg" /></TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-48 text-center">
                                        <div className="flex flex-col items-center gap-3 text-slate-300 dark:text-slate-600">
                                            {emptyIcon && <div className="opacity-40">{emptyIcon}</div>}
                                            <p className="text-sm text-slate-400 dark:text-slate-500">{t('no_data')}</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((row, i) => (
                                    <motion.tr
                                        key={row.id || i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.025 }}
                                        onClick={() => onRowClick?.(row)}
                                        className={`border-b border-slate-50 dark:border-slate-800/50 last:border-0 transition-colors ${onRowClick ? 'cursor-pointer hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/20'
                                            }`}
                                    >
                                        {columns.map(col => (
                                            <td key={col.accessorKey || col.id} className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                                                {col.cell ? col.cell(row) : row[col.accessorKey]}
                                            </td>
                                        ))}
                                    </motion.tr>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                    <span>{t('rows_per_page')}</span>
                    <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(0); }}>
                        <SelectTrigger className="w-16 h-8 bg-white dark:bg-slate-900">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 20, 50].map(n => (
                                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-1">
                    <span>{t('showing')} {page * pageSize + 1}-{Math.min((page + 1) * pageSize, filteredData.length)} {t('of')} {filteredData.length} {t('results')}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={page === 0}
                        onClick={() => setPage(p => p - 1)}
                    >
                        {isRTL() ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </Button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const pageNum = totalPages <= 5 ? i : Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
                        return (
                            <Button
                                key={pageNum}
                                variant={page === pageNum ? 'default' : 'outline'}
                                size="icon"
                                className={`h-8 w-8 ${page === pageNum ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                                onClick={() => setPage(pageNum)}
                            >
                                {pageNum + 1}
                            </Button>
                        );
                    })}
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(p => p + 1)}
                    >
                        {isRTL() ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}