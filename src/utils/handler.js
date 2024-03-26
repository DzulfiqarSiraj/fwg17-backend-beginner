exports.pageHandler = (count, limit, page) => {
    return {
        currentPage : Number(page),
        nextPage    : Number(page) + 1,
        prevPage    : Number(page) - 1,
        totalPage   : Math.ceil(count / limit),
        totalData   : count
    }
}

exports.resTrue = (response, msg, isPage = false, isResults = false, pageData = null, resultData = null) => {
    if(!isPage && !isResults){
        return response.json({
            success : true,
            message : msg,
        })
    } else if (isPage && isResults){
        return response.json({
            success     : true,
            message     : msg,
            pageInfo    : {
                totalPage   : pageData.totalPage,
                currentPage : pageData.currentPage,
                nextPage    : pageData.nextPage <= pageData.totalPage ? pageData.nextPage : null,
                prevPage    : pageData.prevPage > 0 ? pageData.prevPage : null,
                totalData   : pageData.totalData
            },
            results   : resultData
        })
    } else if (isResults){
        return response.json({
            success : true,
            message : msg,
            results : resultData
        })
    }
}

exports.resFalse = (err, response, msg = null, contName = 'Source') => {
    if(err.code == 'ECONNREFUSED'){
        return response.status(500).json({
            success : false,
            message : 'Database Connection Error'
        })
    } else if(err.code == 'ENOTFOUND') {
        return response.status(500).json({
            success : false,
            message : `Can't Connect to Database`
        })
    } else if(err.code === '2201X' || msg === 'OFFSET must not be negative'){
        return response.status(400).json({
            success : false,
            message : 'Bad Request'
        })
    } else if(msg === `Keyword doesn't match`){
        return response.status(404).json({
            success : false,
            message : `${contName}s Not Found`
        })
    } else if(err.code === '23505') {
        return response.status(409).json({
            success : false,
            message : `${contName} Name Already Exists`
        })
    } else if(msg === `Id is not found`){
        return response.status(404).json({
            success : false,
            message : `${contName} Not Found`
        })
    } else if(err.code === '23502' || msg === 'Undefined input') {
        return response.status(400).json({
            success : false,
            message : 'Empty Body Input'
        })
    } else if(err.message.slice(0,9) === 'Duplicate'){
        let newErrMsg = ''
        err.message.split(',').forEach((value) => {
            newErrMsg += `${value[0].toUpperCase() + value.slice(1)} or `
        })
        newErrMsg = newErrMsg.slice(13,newErrMsg.length - 4)
        return response.status(409).json({
            success : false,
            message : `Duplicate ${newErrMsg}`
        })
    } else if(err.message ===  'Send to own account'){
        return response.status(400).json({
            success : false,
            message : `Can't send message to own account`
        })
    } else if(err.message === 'Already exists'){
        return response.status(409).json({
            success : false,
            message : `${contName} Already Exists`
        })
    } else if(err.message === 'Extension issue'){
        return response.status(415).json({
            success : false,
            message : 'Unsupported File Extension. Allowed Extension : png, jpg, jpeg'
        })
    } else if(err.code === 'LIMIT_FILE_SIZE'){
        return response.status(413).json({
            success : false,
            message : 'File Too Large. Upload Size Must Less Than 1MB'
        })
    }

    return response.status(500).json({
        success : false,
        message : msg
    })
}

exports.randNumGen = () => {
    const result = Math.random(1).toPrecision(6).slice(2)
    return result
}