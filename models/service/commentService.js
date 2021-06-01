const commentModel = require('../mongoose/commentModel');

const limit=10;

exports.Comment = async(pageNumber, itemPerPage, filter)=>{
    //Thêm điều kiện
    filter.idParentCmt=undefined;

    const sort={cmtDate: -1};
    const option={
        offset: (pageNumber-1)*itemPerPage,
        limit: itemPerPage,
        sort: sort,
        lean: false
    }
    
    const listComment = await commentModel.paginate(filter,option);
    
    let count=0;
    for(let i=0; i<listComment.totalDocs;i++){
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
        nameCustomer: data.nameCustomer==undefined?"Minh Trí":data.nameCustomer,  
    };
    if(data.idParentComment!=undefined) doc.idParentCmt=data.idParentComment;
    const comment = new commentModel(doc);
    
    comment.save();
}