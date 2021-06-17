const commentModel = require('../mongoose/commentModel');
//const userService = require('./userService')
const limit=10;

exports.Comment = async(pageNumber, itemPerPage, filter)=>{
    //Thêm điều kiện
    filter.idParentCmt=undefined;

    const sort={cmtDate: -1};
    const option={
        offset: (pageNumber-1)*itemPerPage,
        limit: itemPerPage,
        sort: sort,
    }
    
    const listComment = await commentModel.paginate(filter,option);
    
    let count=0;
    //console.log(listComment);
    let size = pageNumber<listComment.totalPages?10:listComment.totalDocs-(pageNumber-1)*itemPerPage;
    for(let i=0; i<size;i++){
        
        listComment.docs[i].numChild = await commentModel.countDocuments({idParentCmt:listComment.docs[i]._id, 
                                        idProduct: listComment.docs[i].idProduct});
    }

    return listComment;
}

exports.listChildComment = async(filter)=>{
    const sort={cmtDate: 1};
    const option={
        sort: sort,
    };
    const listComment=await commentModel.paginate(filter,option);
    return listComment;
}

exports.addComment = async(data)=>{

    const doc={
        idProduct: data.idProduct,
        content: data.txtComment,
        cmtDate: Date.now(),
        avatar: data.avatar==undefined?"/images/user.jpg":data.avatar,
        nameCustomer: data.nameUser==undefined?"Ẩn Danh":data.nameUser,  
    };
    if(data.idParentComment!=undefined) doc.idParentCmt=data.idParentComment;
    const comment = new commentModel(doc);
    
    comment.save();
}