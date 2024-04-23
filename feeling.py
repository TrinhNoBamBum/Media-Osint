def feelingVI(cam_xuc):
    if(cam_xuc['POSITIVE_SCORE']>0.8):
        return 'POSITIVE'
    if(cam_xuc['NEGATIVE_SCORE']<0.2):
        return 'NEGATIVE'
    else:
        return 'NEUTRAL'
def feelingEN(cam_xuc):
    if(cam_xuc['POSITIVE_SCORE']>0.8):
        return 'POSITIVE'
    if(cam_xuc['NEGATIVE_SCORE']<0.2):
        return 'NEGATIVE'
    else:
       return 'NEUTRAL'