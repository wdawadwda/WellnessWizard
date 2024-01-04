import chardet
def get_encoding(string):
   result = chardet.detect(string)
   return result['encoding']

def reload():
    with open("D:\Programs\MongoDB\databases\products.bson", 'r', encoding="cp850") as file:
        while True:
            line = file.readline()
            # print(line)

            # print(get_encoding(line.encode()))
            line_encode = line.encode("cp850").decode('utf-8', errors='replace')
            print(line_encode)
            print(get_encoding(line_encode.encode()))

            with open("D:\Programs\MongoDB\databases\prod_backup.bson", 'ab') as backup_file:
                backup_file.write(line_encode.encode('utf-8'))
                pass
    print("DONE")

if __name__ == '__main__':
    reload()

