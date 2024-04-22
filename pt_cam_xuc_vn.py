import torch
from transformers import RobertaForSequenceClassification, AutoTokenizer

model = RobertaForSequenceClassification.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")

tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment", use_fast=False)

# Just like PhoBERT: INPUT TEXT MUST BE ALREADY WORD-SEGMENTED!
sentence = 'Tình yêu thương là món quà đặc biệt của cuộc sống và không ai có thể sống mà không cần được yêu thương. Vì vậy, đừng ngần ngại thổ lộ yêu thương với những người thân bên cạnh bạn. Bố mẹ, bạn bè, người yêu và cả chính bản thân bạn cũng cần được lắng nghe những lời đẹp, ý hay. Vậy bạn đã chuẩn bị được “món quà tinh thần” này chưa? '  
def pt_cam_xuc_vnmese(contents):
    input_ids = torch.tensor([tokenizer.encode(sentence)])

    with torch.no_grad():
        out = model(input_ids)
        camxuc=out.logits.softmax(dim=-1).tolist()[0]
        return {
            'POSITIVE_SCORE': camxuc[1],
            'NEGATIVE_SCORE': camxuc[0],
        }
    # Output:
    # [[0.002, 0.988, 0.01]]
    #     ^      ^      ^
    #    NEG    POS    NEU