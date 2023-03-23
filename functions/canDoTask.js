function canDoTask(task,role,configuration){
    ownerTasks = [
        'removeAdmin'
    ];
    if(role === "owner") return true;
    else if(role === "admin" && !ownerTasks.includes(task)) return true;
    let roleNumber = (task === 'getFile')?1:(task === 'editFile')?2:(task === 'addMember')?3:(task === 'acceptEdit')?4:5;
    return !(1<<(roleNumber-1)&configuration);
}

module.exports = canDoTask;