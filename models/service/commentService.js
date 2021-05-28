const commentModel = require('../mongoose/commentModel');

const limit=10;

exports.Comment = async(pageNumber, itemPerPage, filter)=>{

    const Comment= await commentModel.find({idProduct: filter.idProduct,
                                            idParentCmt: {$ne:undefined}
                                            });
    console.log(Comment);

    //Thêm điều kiện
    filter.idParentCmt=undefined;

    const sort={cmtDate: -1};
    const option={
        offset: (pageNumber-1)*itemPerPage,
        limit: itemPerPage,
        sort: sort,
    }
    
    const listComment = await commentModel.paginate(filter,option);
    // for(let i=0;i<listComment.docs.length;i++){

    //     console.log(listComment.docs[i].content);
    //     console.log(listComment.docs[i]._id);
    //     listComment.docs[i].haveChild=false;
    //     console.log(listComment.docs[i].haveChild);
    //     for(let j of Comment){
    //         console.log(j.idParentCmt);
    //         if(listComment.docs[i]._id==j.idParentCmt){
    //             listComment.docs[i].haveChild=true;
    //             break;
    //         }
    //     }
    //     console.log(listComment.docs[i].haveChild);
    // }
    return listComment;
}

exports.listChildComment = async(filter)=>{
    const sort={cmtDate: 1};
    const option={
        sort: sort,
    };1
    const listComment=await commentModel.paginate(filter,option);

    console.log(listComment.docs);
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