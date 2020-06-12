import numpy as np
import xlrd
import time

def sigmoid(x):
    a = np.array(x)
    for i in range(a.shape[1]):
        if a[0][i] >= 0:
            a[0][i] = 1 / (1 + np.exp(-a[0][i]))
        else:
            a[0][i] = np.exp(a[0][i]) / (1+np.exp(a[0][i]))
    return np.mat(a)
#    return 1 / (1 + np.exp(-x))


#def diff_sigmoid(x):   #x为矩阵时，*是矩阵乘法
#    return sigmoid(x) * (1 - sigmoid(x))


def tansig(x):
    return 2 / (1 + np.exp(-2 * x)) - 1

#def diff_tansig(x):
#    return 1 - tansig(x) ** 2 


x = 4   #输入层元素个数
y = 8   #隐藏层元素个数
z = 1   #输出层元素个数


def dataset(path):
    workbook = xlrd.open_workbook(path)
    sheet = workbook.sheet_by_index(0)
    nrow = sheet.nrows
    dataset = []
    for i in range(nrow):
        dataset.append(sheet.row_values(i))
    return dataset

def init(x,y,z):#x、y、z分别表示输入层、隐藏层、输出层元素个数
    np.random.seed(1)
    weight1 = np.random.randn(x,y)
    weight2 = np.random.randn(y,z)
    biases1 = np.random.randn(1,y)
    biases2 = np.random.randn(1,z)
    return weight1,weight2,biases1,biases2

#weight1,weight2,biases1,biases2 = init(x,y,z)
    
def train(dataset,x,y,z):
    learn = 0.05
    
    weight1,weight2,biases1,biases2 = init(x,y,z)
    
    for j in range(10000):
        for i in range(len(dataset)):#
            input_set = np.mat(dataset[i][:x])
            output_set = np.mat(dataset[i][x:x+z])
            #隐藏层输入和输出
            input1 = np.dot(input_set, weight1) - biases1
            output1 = sigmoid(input1)
#            output1 = tansig(input1)
            
            #输出层输入和输出
            input2 = np.dot(output1, weight2) - biases2
            output2 = sigmoid(input2)
#            output2 = tansig(input2)
            
            ####BP####
            
#            temp = 1 - np.multiply(output2,output2)     #d_tansig
            temp = np.multiply(output2,1 - output2)     #d_logsig
            #deta = np.multiply(outputset - output2,diff_sigmoid(input2))
            deta = np.multiply(output_set - output2,temp)
            
    
            temp1 = np.dot(deta,weight2.T)
            #temp2 = diff_sigmoid(input1)
            temp2 = np.multiply(output1,1 - output1)    #d_logsig
#            temp2 = 1 - np.multiply(output1,output1)    #d_tansig
            deta_ = np.multiply(temp1,temp2)
            
            
            weight2 += learn * np.dot(output1.T, deta)
            biases2 += -learn * deta
            
            
            weight1 += learn * np.dot(input_set.T, deta_)
            biases1 += -learn * deta_
        
        
        
    return weight1,weight2,biases1,biases2


def test(dataset,weight1,weight2,biases1,biases2):
    right_0_05 = 0
    right_0_1 = 0
    
    for i in range(len(dataset)):
        input_set = np.mat(dataset[i][:x])
        label_set = np.mat(dataset[i][x:x+z])
        
        #隐藏层输入和输出
        input1 = np.dot(input_set, weight1) - biases1
        output1 = sigmoid(input1)
        #输出层输入和输出
        input2 = np.dot(output1, weight2) - biases2
#        output2 = sigmoid(input2)
        output2 = tansig(input2)
        
#        print(output1,end = " ")
        print(output2,end = " ")
        print(label_set)
        
        if abs(output2 - label_set) < 0.05:
            right_0_05 += 1
        if abs(output2 - label_set) < 0.1:
            right_0_1 += 1
    print("0.05误差下准确率为:",end = '')
    print(right_0_05 / len(dataset))
    print("0.1误差下准确率为:",end = '')
    print(right_0_1 / len(dataset))


if __name__ == '__main__':
#    time_start = time.time()
    
    dataset = dataset("G2D2_train.xls")
    length = len(dataset)
    train_set = dataset[length // 10:]
    test_set = dataset[:length // 10]
    
    weight1,weight2,biases1,biases2 = train(train_set,x,y,z)
#    print(weight1)
#    print(biases1)
#    print(weight2)
#    print(biases2)
    test(test_set,weight1,weight2,biases1,biases2)
    #test(train_set,weight1,weight2,biases1,biases2)
    
    
#    time_end = time.time()
#    print('耗时：',time_end-time_start)









