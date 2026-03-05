export const filterDelay = (history) => {
    if (!history || history.length === 0) {
        return -1;
    }
    else {
        return history[history.length - 1].delay;
    }
};
export var SortType;
(function (SortType) {
    SortType["Default"] = "default";
    SortType["Delay"] = "delay";
    SortType["Name"] = "name";
})(SortType || (SortType = {}));
export const nodeSortingFn = (selectedGroup, type) => {
    let sortedList = selectedGroup.all?.slice();
    switch (type) {
        case SortType.Delay: {
            sortedList = sortedList?.sort((a, b) => {
                const delayA = filterDelay(a.history);
                const delayB = filterDelay(b.history);
                if (delayA === -1 || delayA === -2)
                    return 1;
                if (delayB === -1 || delayB === -2)
                    return -1;
                if (delayA === 0)
                    return 1;
                if (delayB === 0)
                    return -1;
                return delayA - delayB;
            });
            break;
        }
        case SortType.Name: {
            sortedList = sortedList?.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
    }
    return {
        ...selectedGroup,
        all: sortedList,
    };
};
